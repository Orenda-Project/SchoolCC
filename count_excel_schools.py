#!/usr/bin/env python3
import pandas as pd
import sys

# Read both Excel files
male_file = "List of Schools Tehsil RWP MALE.xlsx"
female_file = "List of schools in tehsil Rawalpindi  Female for Taleemabad.xlsx"

try:
    male_df = pd.read_excel(male_file)
    female_df = pd.read_excel(female_file)

    # Get EMIS numbers from both files
    # Try common column names
    male_emis = None
    female_emis = None

    for col in male_df.columns:
        if 'emis' in col.lower() or 'code' in col.lower():
            male_emis = male_df[col].astype(str).str.strip()
            print(f"Male file - Using column: {col}")
            break

    for col in female_df.columns:
        if 'emis' in col.lower() or 'code' in col.lower():
            female_emis = female_df[col].astype(str).str.strip()
            print(f"Female file - Using column: {col}")
            break

    if male_emis is None or female_emis is None:
        print("\nAll columns in Male file:", male_df.columns.tolist())
        print("All columns in Female file:", female_df.columns.tolist())
        sys.exit(1)

    # Combine and get unique
    all_emis = pd.concat([male_emis, female_emis])

    # Remove NaN and empty strings
    all_emis = all_emis[all_emis.notna()]
    all_emis = all_emis[all_emis != '']
    all_emis = all_emis[all_emis != 'nan']

    print(f"\nMale schools: {len(male_emis)}")
    print(f"Female schools: {len(female_emis)}")
    print(f"Total entries: {len(all_emis)}")
    print(f"Unique EMIS numbers: {all_emis.nunique()}")

    # Find duplicates
    duplicates = all_emis[all_emis.duplicated(keep=False)].unique()
    if len(duplicates) > 0:
        print(f"\nDuplicate EMIS numbers found: {len(duplicates)}")
        for dup in duplicates:
            count = (all_emis == dup).sum()
            print(f"  - {dup}: appears {count} times")
    else:
        print("\nNo duplicates found!")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
