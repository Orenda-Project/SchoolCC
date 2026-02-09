# School Data Sync Summary

## Overview
This report summarizes the SQL scripts generated to sync school data from Excel files to the production database.

**Generated**: 2026-02-02T08:06:09.748Z

## Data Source
- **Male schools file**: `List of Schools Tehsil RWP MALE.xlsx`
- **Female schools file**: `List of schools in tehsil Rawalpindi Female for Taleemabad.xlsx`
- **Total schools**: 260

## Generated Files

### 1. `preview_school_updates.sql`
Preview queries to show what will change BEFORE executing updates.

**What it does**:
- Shows which schools exist (will be updated)
- Shows which schools don't exist (will be inserted)
- Previews name changes
- Shows markaz matching results
- Counts affected records in dependent tables

**How to use**: Run this first in your SQL console to review changes.

### 2. `sync_schools_from_excel.sql`
The main sync script with all UPDATE and INSERT statements.

**What it does**:
- Updates `schools.name` for all 260 schools (matched by EMIS)
- Updates `schools.markaz_id` where markaz exists in database
- Cascades schoolName updates to 9 dependent tables:
  - `users`
  - `request_assignees`
  - `teacher_leaves`
  - `queries` (sender_school_name)
  - `visit_logs`
  - `school_albums`
  - `monitoring_visits`
  - `mentoring_visits`
  - `visit_sessions`
- Inserts new schools that don't exist (with `NOT EXISTS` check)

**Safety**:
- Wrapped in single transaction (BEGIN...COMMIT)
- All-or-nothing execution
- Automatic rollback on any error

### 3. `school_sync_summary.md` (this file)
Summary report with statistics and instructions.

## School Statistics

### By Gender
- Male schools: 103
- Female schools: 157

### Sample EMIS Codes
- 37330250: GPS HAYAL.
- 37330254: GPS MISRIOT
- 37330305: GPS CENTRAL JAIL RWP
- 37330307: GPS DHALA
- 37330309: GPS BODIAL
- 37330315: GPS DEGAL
- 37330317: GPS DHAMIAL
- 37330335: GPS SHAHPUR SYEDAN
- 37330349: GPS KALRI
- 37330350: GES KHASALAA KALLAN
... and 250 more

## Markaz Information

### Unique Markazes (23 total)
1. ADYALA
2. BASSALI
3. CHAKLALA
4. CHAKRI
5. CHAUNTRA
6. JHATTA HATHIAL
7. PIR WADHAI
8. RWP CANTT
9. SHAKRIAL
10. BAGGA SHEIKHAN
11. LOHDRAN FEMALE
12. CHAKRI FEMALE
13. JHATTA HATHIAL FEMALE
14. CHAK BELI KHAN FEMALE
15. CHOUNTRA FEMALE
... and 8 more

### Markaz Matching Strategy
The SQL uses case-insensitive matching with trimming and period removal:
- "ADYALA" matches "Adyala" or "ADYALA."
- "PIR WADHAI" matches "Pir Wadhai" or "PIR WADHAI."

If a markaz from Excel doesn't exist in the database, `markaz_id` will be set to NULL.

## Execution Instructions

### Prerequisites
1. **Backup your database** (CRITICAL!)
   ```bash
   pg_dump -h HOST -U USER -d DATABASE > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Review preview SQL**
   - Open `preview_school_updates.sql`
   - Run it in your SQL console
   - Review the output to understand what will change

3. **Review final SQL**
   - Open `sync_schools_from_excel.sql`
   - Read through the UPDATE and INSERT statements
   - Verify the logic matches your expectations

### Execution Steps

1. **Connect to production database**
   ```bash
   psql -h HOST -U USER -d DATABASE
   ```

2. **Run preview queries** (recommended)
   ```sql
   \i preview_school_updates.sql
   ```

3. **Execute sync script**
   ```sql
   \i sync_schools_from_excel.sql
   ```

4. **Verify results**
   The script includes verification queries at the end.
   Check that:
   - School count is correct
   - Sample schools have correct names
   - No mismatched schoolName in dependent tables

### Expected Results
- **Transaction**: Should complete in <60 seconds
- **Updates**: 260 schools updated (name and/or markaz_id)
- **Cascade updates**: All dependent tables updated automatically
- **Inserts**: Any new schools (EMIS codes not in database) will be inserted

## Verification Queries

After running the sync script, verify with these queries:

### 1. Total school count
```sql
SELECT COUNT(*) FROM schools;
-- Expected: At least 260 schools
```

### 2. Check sample schools
```sql
SELECT emis_number, name, markaz_id
FROM schools
WHERE emis_number IN ('37330250', '37330254', '37330305')
ORDER BY emis_number;
```

### 3. Verify cascade updates
```sql
-- Check for any mismatched schoolName (should be 0)
SELECT COUNT(*) as mismatched_count
FROM users u
JOIN schools s ON u.school_id = s.id
WHERE u.school_name != s.name;
```

### 4. Check markaz assignments
```sql
SELECT
  s.emis_number,
  s.name as school_name,
  m.name as markaz_name
FROM schools s
LEFT JOIN markazes m ON s.markaz_id = m.id
WHERE s.emis_number IN ('37330250', '37330254', '37330305')
ORDER BY s.emis_number;
```

## Warnings and Considerations

### Markaz Matching
- Markazes must exist in the `markazes` table for assignment to work
- If a markaz from Excel doesn't exist, `markaz_id` will be NULL
- Check the preview SQL output to see which markazes exist

### School Name Variations
- EMIS is the unique identifier - names can vary
- The sync will always use the name from the Excel file
- Old names will be completely replaced (not preserved)

### Dependent Tables
- All 9 tables with denormalized `schoolName` will be updated
- This ensures data consistency across the system
- Historical records will show the NEW school name (old name is NOT preserved)

### Transaction Safety
- Entire operation is atomic (all-or-nothing)
- If ANY error occurs, ENTIRE transaction rolls back
- No partial updates possible

## Troubleshooting

### If transaction fails
1. Check the error message
2. Verify district and cluster exist:
   ```sql
   SELECT * FROM districts WHERE code = 'RWP';
   SELECT * FROM clusters WHERE code = 'RWP-C';
   ```
3. Check for constraint violations (e.g., duplicate EMIS)
4. Restore from backup if needed

### If markazes don't match
1. List existing markazes:
   ```sql
   SELECT * FROM markazes ORDER BY name;
   ```
2. Compare with Excel markaz names (see list above)
3. Create missing markazes if needed, then re-run

### If cascade updates fail
1. Check foreign key constraints
2. Verify `school_id` values exist in `schools` table
3. Review error message for specific table

## Support
If you encounter issues:
1. Check the error message carefully
2. Restore from backup if needed
3. Review the SQL script logic
4. Contact database administrator

## Next Steps
1. Run preview SQL
2. Review output
3. Backup database
4. Run sync SQL
5. Verify results
6. Test application

---
Generated by Claude Code
2026-02-02T08:06:09.749Z
