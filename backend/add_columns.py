import sqlite3

def upgrade_db():
    try:
        conn = sqlite3.connect('truthlens.db')
        cursor = conn.cursor()
        
        # Add sentiment column
        try:
            cursor.execute("ALTER TABLE analysis_history ADD COLUMN sentiment VARCHAR(50)")
            print("Added sentiment column")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print("Sentiment column already exists")
            else:
                print(f"Error adding sentiment: {e}")
                
        # Add keywords_count column
        try:
            cursor.execute("ALTER TABLE analysis_history ADD COLUMN keywords_count INTEGER")
            print("Added keywords_count column")
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print("keywords_count column already exists")
            else:
                print(f"Error adding keywords_count: {e}")
                
        conn.commit()
        conn.close()
        print("Database upgrade complete.")
    except Exception as e:
        print(f"Database error: {e}")

if __name__ == "__main__":
    upgrade_db()
