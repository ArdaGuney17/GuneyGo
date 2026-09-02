import os
import shutil
import re

# Lists
tr_pages = ['ana-sayfa.html', 'hakkımızda.html', 'hastalar-için.html', 'sağlık-turizmi-acenteleri-için.html', 'şirketler-için.html', 'iletişime-geçin.html', 'hastalar-için-iletişim.html', 'acenteler-için-iletişim.html', 'şirketler-için-iletişim.html', 'aydinlatmametni_tr.html']
en_pages = ['index.html', 'about-us.html', 'for-patients.html', 'for-agencies.html', 'for-companies.html', 'contact-us.html', 'contact-for-patients.html', 'contact-for-agencies.html', 'contact-for-companies.html', 'aydinlatmametni.html']

image_exts = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')

# 1. Create dirs
os.makedirs('en', exist_ok=True)
os.makedirs('tr', exist_ok=True)
os.makedirs('img', exist_ok=True)

# 2. Move images
files = os.listdir('.')
for f in files:
    if os.path.isfile(f) and f.lower().endswith(image_exts):
        # Don't move favicon.ico if we want it at root, but user has favicon.ico? Let's check
        if f == 'favicon.ico':
            continue
        shutil.move(f, os.path.join('img', f))

# 3. Move HTML files
for f in tr_pages:
    if os.path.exists(f):
        shutil.move(f, os.path.join('tr', f))

for f in en_pages:
    if os.path.exists(f):
        shutil.move(f, os.path.join('en', f))

# 4. Create root index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write('''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Artun Healthcare Consultancy</title>
    <script>
        var lang = navigator.language || navigator.userLanguage;
        if (lang.startsWith('tr')) {
            window.location.href = 'tr/ana-sayfa.html';
        } else {
            window.location.href = 'en/index.html';
        }
    </script>
</head>
<body>
    <p>Redirecting... <a href="en/index.html">English</a> | <a href="tr/ana-sayfa.html">Türkçe</a></p>
</body>
</html>''')

# 5. Update HTML files inside en/ and tr/
def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update relative paths to folders
    content = re.sub(r'href="(css/|js/|components/|img/)', r'href="../\1', content)
    content = re.sub(r'src="(css/|js/|components/|img/)', r'src="../\1', content)

    # Update loose images
    # Basically any src="something.png" becomes src="../img/something.png"
    # We'll use a regex that looks for src="filename.ext" where filename does not contain a slash
    content = re.sub(r'src="([^"/]+\.(?:png|jpg|jpeg|gif|svg|webp))"', r'src="../img/\1"', content)
    # Also og:image meta tags, e.g. content="bosphorus.png" -> content="../img/bosphorus.png", or absolute URLs
    content = re.sub(r'content="([^"/]+\.(?:png|jpg|jpeg|gif|svg|webp))"', r'content="../img/\1"', content)

    # background-image: url('bosphorus.png')
    content = re.sub(r"url\('([^'/]+\.(?:png|jpg|jpeg|gif|svg|webp))'\)", r"url('../img/\1')", content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in en_pages:
    path = os.path.join('en', f)
    if os.path.exists(path):
        update_html_file(path)

for f in tr_pages:
    path = os.path.join('tr', f)
    if os.path.exists(path):
        update_html_file(path)

print("Done moving files and updating HTML.")
