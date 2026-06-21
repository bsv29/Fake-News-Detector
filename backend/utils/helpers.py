def sanitize_filename(filename: str) -> str:
    import re
    return re.sub(r'[^a-zA-Z0-9_\-.]', '', filename)
