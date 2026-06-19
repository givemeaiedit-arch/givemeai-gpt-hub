# AI Check Ads OpenAI Integration

ไฟล์ชุดนี้ใช้สำหรับต่อหน้า `ai-check-ads.html` เข้ากับ OpenAI แบบไม่ฝัง API key ในหน้าเว็บ

## ไฟล์

- `ai-check-ads-prompt.md`
  - prompt วิเคราะห์ภาพฉบับเต็ม
- `ai-check-ads-schema.json`
  - JSON schema ที่หน้าเว็บควรรับกลับ
- `ai-check-ads-server.mjs`
  - backend ตัวอย่างแบบ Node ล้วน ไม่ใช้ dependency เพิ่ม

## รัน backend ตัวอย่าง

```bash
set OPENAI_API_KEY=YOUR_KEY
set OPENAI_MODEL=gpt-5.4-mini
node openai/ai-check-ads-server.mjs
```

## endpoint

`POST /api/ai-check-ads/analyze`

ตัวอย่าง request:

```json
{
  "imageBase64": "BASE64_IMAGE_DATA",
  "mimeType": "image/jpeg",
  "productName": "เซรั่มลดสิว",
  "targetMarket": "TH",
  "objective": "meta_ads_conversion",
  "notes": "ต้องการวิเคราะห์ภาพโฆษณาสำหรับขายจริง"
}
```

ตัวอย่าง response:

```json
{
  "overall_score": 78,
  "creative_potential": "สูง",
  "summary_3_lines": [
    "สื่อ pain และผลลัพธ์ได้ไว",
    "มี offer ดี แต่ CTA ยังไม่แรง",
    "audience signal ค่อนข้างชัด"
  ],
  "primary_audience": {
    "demographic": "ผู้หญิง 18-30 ปี ในไทย",
    "interests": [
      "Skincare",
      "Beauty"
    ],
    "behaviors": [
      "ชอบรีวิว"
    ],
    "pain_desire": [
      "สิว",
      "รอยสิว"
    ],
    "creative_signals": [
      "คำว่าลดสิว",
      "ภาพนางแบบ",
      "ราคา"
    ]
  },
  "secondary_audiences": [],
  "audience_size_estimate": {
    "min": 1500000,
    "max": 4000000,
    "confidence": "กลาง-สูง",
    "rationale": "ประเมินจาก creative signal"
  },
  "andromeda_signal_check": {
    "clarity": "ค่อนข้างชัด",
    "understood_signals": [
      "ผู้หญิงวัยทำงาน"
    ],
    "confusing_signals": [
      "proof ยังไม่พอ"
    ]
  },
  "category_scores": {
    "hook_scroll_stop": 13,
    "audience_signal": 13,
    "pain_desire_clarity": 9,
    "offer_strength": 12,
    "creative_clarity": 8,
    "proof_trust": 7,
    "objection_handling": 6,
    "cta": 3,
    "andromeda_readiness": 7
  },
  "strengths": [],
  "weaknesses": [],
  "fixes_now": [],
  "hook_options": [
    "ตัวอย่าง 1",
    "ตัวอย่าง 2",
    "ตัวอย่าง 3",
    "ตัวอย่าง 4",
    "ตัวอย่าง 5"
  ],
  "final_verdict": {
    "status": "ควรแก้ก่อนรัน",
    "reason": "CTA และ proof ยังไม่พอ"
  }
}
```

## จุดที่ควรทำต่อ

1. ผูก `ai-check-ads.js` ให้ยิง request ไป backend นี้
2. map JSON แต่ละ field เข้า card ในหน้า UI
3. เพิ่ม loading state และ error state
