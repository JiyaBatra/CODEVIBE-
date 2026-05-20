import os
import glob
import re

dir_path = r"C:\Users\H S SAMIRA\CODEVIBE-\client\src\components"
files = glob.glob(os.path.join(dir_path, "*Lesson*.jsx")) + glob.glob(os.path.join(dir_path, "Clesson*.jsx"))

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if hint is already present
    if 'hint=' in content:
        continue
        
    # Default hint
    hint_text = "💡 Review the lesson instructions carefully. Make sure your output matches exactly."
    
    # Try to extract the instructions block
    inst_match = re.search(r'<pre[^>]*instructions[^>]*>([\s\S]*?)</pre>', content)
    if inst_match:
        inst = inst_match.group(1).replace('`', '').replace('{', '').replace('}', '').replace('Task:', '').strip()
        lines = [line.strip() for line in inst.split('\n') if line.strip() and not 'Output:' in line]
        if lines:
            # take first 2 descriptive lines
            extracted = " ".join(lines[:2]).strip()
            if extracted:
                hint_text = "💡 Hint: " + extracted.replace('"', "'").replace('\n', ' ')

    # Cut if too long
    if len(hint_text) > 120:
        hint_text = hint_text[:117] + "..."
        
    # Safety: ensure no multiline breaks in the hint string
    hint_text = hint_text.replace('\r', '').replace('\n', ' ')
        
    # Inject into Compiler tag
    if '<Compiler' in content:
        new_content = content.replace('<Compiler', f'<Compiler\n        hint="{hint_text}"', 1)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file)} with hint")
