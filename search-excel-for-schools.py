#!/usr/bin/env python3
import pandas as pd
import sys

# Read both Excel files
try:
    male_file = "List of Schools Tehsil RWP MALE.xlsx"
    female_file = "List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx"

    print("=" * 100)
    print("SEARCHING EXCEL FILES FOR MISSING SCHOOLS")
    print("=" * 100)

    # Read both files
    df_male = pd.read_excel(male_file)
    df_female = pd.read_excel(female_file)

    print(f"\nMale schools file: {len(df_male)} rows")
    print(f"Female schools file: {len(df_female)} rows")

    # Combine both
    df_all = pd.concat([df_male, df_female], ignore_index=True)
    print(f"Total combined: {len(df_all)} schools\n")

    # Display column names
    print("Available columns:")
    for i, col in enumerate(df_all.columns, 1):
        print(f"  {i}. {col}")

    print("\n" + "=" * 100)
    print("SEARCH 1: GPS HAYAL (EMIS: 37330250)")
    print("=" * 100)

    # Search for HAYAL by EMIS
    hayal_results = df_all[df_all['EMIS Code'].astype(str).str.contains('37330250', case=False, na=False)]

    if len(hayal_results) > 0:
        print(f"\n✅ FOUND {len(hayal_results)} match(es):\n")
        for idx, row in hayal_results.iterrows():
            print(f"School Name: {row.get('School Name', 'N/A')}")
            print(f"EMIS Code: {row.get('EMIS Code', 'N/A')}")
            print(f"Markaz: {row.get('Markaz', 'N/A')}")
            print(f"Gender: {row.get('Gender', 'N/A')}")
            print(f"AEO: {row.get('Name of AEO', 'N/A')}")
            print()
    else:
        print("❌ Not found by EMIS")
        # Try by name
        hayal_name = df_all[df_all['School Name'].astype(str).str.contains('hayal', case=False, na=False)]
        if len(hayal_name) > 0:
            print(f"\n🔍 Found {len(hayal_name)} similar by name:")
            for idx, row in hayal_name.iterrows():
                print(f"  - {row.get('School Name', 'N/A')} (EMIS: {row.get('EMIS Code', 'N/A')}, Markaz: {row.get('Markaz', 'N/A')})")

    print("\n" + "=" * 100)
    print("SEARCH 2: GBES kuri khuda baksh Rawalpindi")
    print("=" * 100)

    # Search for kuri
    kuri_results = df_all[
        df_all['School Name'].astype(str).str.contains('kuri', case=False, na=False) |
        df_all['School Name'].astype(str).str.contains('khuda', case=False, na=False) |
        df_all['School Name'].astype(str).str.contains('baksh', case=False, na=False)
    ]

    if len(kuri_results) > 0:
        print(f"\n✅ FOUND {len(kuri_results)} potential match(es):\n")
        for idx, row in kuri_results.iterrows():
            print(f"School Name: {row.get('School Name', 'N/A')}")
            print(f"EMIS Code: {row.get('EMIS Code', 'N/A')}")
            print(f"Markaz: {row.get('Markaz', 'N/A')}")
            print(f"Gender: {row.get('Gender', 'N/A')}")
            print(f"AEO: {row.get('Name of AEO', 'N/A')}")
            print()
    else:
        print("❌ Not found")

    print("\n" + "=" * 100)
    print("SEARCH 3: GMES gulshanabad")
    print("=" * 100)

    # Search for gulshan
    gulshan_results = df_all[df_all['School Name'].astype(str).str.contains('gulshan', case=False, na=False)]

    if len(gulshan_results) > 0:
        print(f"\n✅ FOUND {len(gulshan_results)} potential match(es):\n")
        for idx, row in gulshan_results.iterrows():
            print(f"School Name: {row.get('School Name', 'N/A')}")
            print(f"EMIS Code: {row.get('EMIS Code', 'N/A')}")
            print(f"Markaz: {row.get('Markaz', 'N/A')}")
            print(f"Gender: {row.get('Gender', 'N/A')}")
            print(f"AEO: {row.get('Name of AEO', 'N/A')}")
            print()
    else:
        print("❌ Not found")

    print("\n" + "=" * 100)
    print("SEARCH 4: GPS Adhwal")
    print("=" * 100)

    # Search for adhwal
    adhwal_results = df_all[
        df_all['School Name'].astype(str).str.contains('adhwal', case=False, na=False) |
        df_all['School Name'].astype(str).str.contains('adwal', case=False, na=False)
    ]

    if len(adhwal_results) > 0:
        print(f"\n✅ FOUND {len(adhwal_results)} potential match(es):\n")
        for idx, row in adhwal_results.iterrows():
            print(f"School Name: {row.get('School Name', 'N/A')}")
            print(f"EMIS Code: {row.get('EMIS Code', 'N/A')}")
            print(f"Markaz: {row.get('Markaz', 'N/A')}")
            print(f"Gender: {row.get('Gender', 'N/A')}")
            print(f"AEO: {row.get('Name of AEO', 'N/A')}")
            print()
    else:
        print("❌ Not found")

    print("\n" + "=" * 100)
    print("📊 SUMMARY")
    print("=" * 100)
    print("\nAll 4 schools need manual investigation:")
    print("1. GPS HAYAL - Check Excel for EMIS 37330250")
    print("2. GBES kuri khuda baksh - Search variations")
    print("3. GMES gulshanabad - Search variations")
    print("4. GPS Adhwal - Search variations")
    print("=" * 100)

except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc()
    sys.exit(1)
