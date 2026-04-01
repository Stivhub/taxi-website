import re

with open(r'd:\Websites\taxi\fleet.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Creta Block
content = re.sub(r'\s*<!-- 3\. Hyundai Creta -->\s*(<div class="car-card[\s\S]*?<!-- 5\. Mahindra Scorpio -->)', r'\n\n      <!-- 5. Mahindra Scorpio -->', content)

# Remove Thar Block
content = re.sub(r'\s*<!-- 6\. Mahindra Thar -->\s*(<div class="car-card[\s\S]*?<!-- 7\. Toyota Fortuner -->)', r'\n\n      <!-- 7. Toyota Fortuner -->', content)

# Replace all pricing with "Available for Booking"
content = re.sub(r'<span class="car-price-tag">.*?</span>', r'<span class="car-price-tag" style="font-size: 0.85rem; padding: 6px 12px;">Available for Booking</span>', content)

# Add Popular badge to Ertiga
content = re.sub(r'(<!-- 8\. Maruti Ertiga -->[\s\S]*?<img src="./assets/images/maruti-ertiga.png"[^>]*>)', r'\1\n          <span class="car-badge" style="left: auto; right: 14px; background: var(--c-secondary); color: white;">★ Popular</span>', content)

# Add Popular badge to Innova
content = re.sub(r'(<!-- 9\. Toyota Innova Crysta -->[\s\S]*?<img src="./assets/images/innova-crysta.png"[^>]*>)', r'\1\n          <span class="car-badge" style="left: auto; right: 14px; background: var(--c-secondary); color: white;">★ Popular</span>', content)

with open(r'd:\Websites\taxi\fleet.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("fleet.html processed.")
