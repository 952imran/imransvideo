# Imran Qureshi - Global Video Production & Digital Agency Portfolio
> **Professional English Edition • India, UAE (Dubai) & Worldwide**

A high-converting, agency-grade digital portfolio website designed specifically to pitch high-ticket clients in **India, Dubai (UAE), and International markets**.

---

## 📸 1. How to Add Your Real Photo (Photo Kaise Lagayein)

Aapko ladki ya placeholder photo ki jagah apni khud ki photo lagane ke liye bas **1 simple step** karna hai:

1. Apni koi bhi achhi, professional photo lijiye.
2. Us photo ka naam **`imran-photo.jpg`** rakhiye.
3. Use is folder ke andar paste kar dijiye:
   👉 **`scratch/imran-portfolio/assets/imran-photo.jpg`**

Website automatically aapki photo utha legi aur refresh karte hi aapka face wahan live dikhega!

---

## 🎬 2. Real Videos Kaise Lagayein (YouTube & Reels)

Aap **`portfolio-data.js`** file ko open kijiye (Notepad ya code editor mein).

Wahan har video ka block aisa hai:

```javascript
{
  id: 1,
  title: "Aapka Video Title",
  category: "reels",               // 'reels' ya 'production' ya 'youtube'
  categoryLabel: "Reels & Shorts",
  aspectRatio: "vertical",         // 'vertical' (9:16 mobile reel) ya 'horizontal' (16:9 YouTube)
  type: "youtube_embed",
  videoUrl: "https://www.youtube.com/embed/Aapka_Video_ID",
  thumbnail: "https://images.unsplash.com/... ya aapka thumbnail image link",
  tags: ["4K", "Viral"],
  description: "Video ke baare mein 1 line description."
}
```

### YouTube Video ka Link kaise nikalein:
- Agar YouTube link hai: `https://www.youtube.com/watch?v=ScMzIvxBSi4`
- Toh `videoUrl` mein bas ID daal dijiye: `https://www.youtube.com/embed/ScMzIvxBSi4`
- Agar Reel ya Short hai, toh `aspectRatio: "vertical"` rakhein taaki wo mobile screen jaise 9:16 format mein play ho!

---

## ⭐ 3. Google Business Page & Reviews Integration

Website par ab **Google Business Verified Profile** aur **5.0 Star Rating** ka feature live hai:
- Hero section mein **Google 5.0 Star Verified Badge** hai.
- Client reviews section mein direct **"Rate Us on Google"** aur **"Read Verified Reviews"** button hai.
- Footer aur contact section mein Google link laga hai.

---

## 🌐 4. Free Deployment (No Domain Needed)
- **Vercel**: Is pure folder ko [vercel.com](https://vercel.com) par upload kijiye ➔ 2 minute mein `imransvideo.vercel.app` ban jayega!
- **GitHub Pages**: [github.com](https://github.com) par repo banaiye ➔ `imransvideo.github.io` live ho jayega!
