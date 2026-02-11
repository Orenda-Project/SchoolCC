import os
import json
import pandas as pd
from sqlalchemy import create_engine
from google.cloud import bigquery
from tqdm import tqdm

# =============================
# CONFIGURATION
# =============================

POSTGRES_DATABASE_URL = os.environ["data_base"]

BQ_PROJECT_ID = "niete-bq-prod"
BQ_DATASET = "TaleemHub_DB"

service_account_info = json.loads(os.environ["BQ_SERVICE_ACCOUNT"])

CHUNK_SIZE = 50000

print("🚀 Starting Migration...")

# =============================
# CONNECTIONS
# =============================

engine = create_engine(POSTGRES_DATABASE_URL)
print("✅ Connected to Replit PostgreSQL")

bq_client = bigquery.Client.from_service_account_info(
    service_account_info,
    project=BQ_PROJECT_ID,
)
print("✅ Connected to BigQuery")

# =============================
# GET TABLES
# =============================

tables_query = """
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
"""

tables = pd.read_sql(tables_query, engine)["table_name"].tolist()
print(f"📦 Found {len(tables)} tables")

# =============================
# MIGRATION LOOP
# =============================

for table in tqdm(tables):

    print(f"\n🔄 Migrating: {table}")
    table_id = f"{BQ_PROJECT_ID}.{BQ_DATASET}.{table}"

    try:
        bq_client.delete_table(table_id, not_found_ok=True)

        for chunk in pd.read_sql(
            f'SELECT * FROM "{table}"',
            engine,
            chunksize=CHUNK_SIZE,
        ):

            for col in chunk.select_dtypes(include=["datetime64[ns]"]).columns:
                chunk[col] = chunk[col].astype(str)

            job_config = bigquery.LoadJobConfig(
                write_disposition="WRITE_APPEND",
                autodetect=True,
            )

            job = bq_client.load_table_from_dataframe(
                chunk, table_id, job_config=job_config
            )
            job.result()

        print(f"✔ Finished: {table}")

    except Exception as e:
        print(f"❌ Error in {table}: {e}")

print("\n🎉 Migration Completed Successfully.")


