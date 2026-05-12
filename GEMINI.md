# CommuniKID Web: Master AI Context & Technical Bible

> **AI SYSTEM PROMPT INSTRUCTION:** > If you are an AI Coding Assistant reading this file, this is your absolute source of truth for the `CommuniKID Web` project. Read this carefully before generating any code. Adhere strictly to the architecture, schemas, and rules defined here.

## 1. Project Overview
CommuniKID Web is a high-fidelity tele-rehabilitation platform for the pediatric speech therapy sector.
* **The Problem:** Pediatric speech therapy suffers from a "Drop-off" period between clinical sessions. Therapists lack data on home performance.
* **The Solution:** A digital environment where therapists assign STT (Speech-to-Text) tasks, and children perform them via a gamified interface.

## 2. Tech Stack & Architectural Paradigm
* **Frontend Only:** Pure Vanilla JavaScript (ES6+), HTML5, and CSS3. NO React, NO Vue, NO Node.js (Yet).
* **Local-First Paradigm (MVP Phase):** The browser's `localStorage` acts as our primary Database Management System (DBMS).
* **State Management:** Every state change (updating points, completing tasks) updates the `currentUser` session object AND the global master key in `localStorage`.

## 3. Database Schemas (localStorage JSON Structures)
When interacting with `localStorage`, strictly use these JSON formats:

**A. User Object (Saved under `email` key AND `currentUser`):**
{
  "email": "user@example.com",
  "name": "Zeyad",
  "role": "parent", // or "therapist"
  "doctorCode": "ABCD123@", // Crucial for relation
  "points": 550, // Gamification currency
  "equipped_items": ["hat_1", "shirt_2"] // 3D Market items
}

**B. Assigned Tasks (`all_tasks` key):**
[{
  "patientEmail": "patient@example.com",
  "doctorEmail": "therapist@example.com",
  "content": "تفاحة",
  "type": "تدريب نطق",
  "done": false // flips to true upon STT success
}]

## 4. Core Application Logic
* **Relational Logic:** A Parent enters a Therapist's `myDoctorCode`. The Therapist Dashboard scans `localStorage` and ONLY pulls users where `user.doctorCode === therapist.myDoctorCode`.
* **Speech & AI Engine:** Uses `webkitSpeechRecognition` API. We use a Levenshtein Distance algorithm to calculate pronunciation accuracy. 70% accuracy marks the task as successful.
* **3D Character Customization (Market):** Uses Layered CSS Sprites. Simulated 3D rotation using a Mouse Drag Listener (`transform: rotateY()`).

## 5. STRICT AI DIRECTIVES (READ CAREFULLY)
1. **NO FRAMEWORKS:** Do not suggest React or Node.js packages. Stick to Vanilla JS.
2. **RTL CONTEXT:** This is an Arabic-first application. When generating CSS, always consider `dir="rtl"`.
3. **NO `alert()`:** Never use native `alert()` for user feedback; always use the custom Modal system.
4. **DOUBLE UPDATE RULE:** Every `points` update MUST be reflected in BOTH `currentUser` and the global database key (`localStorage.setItem(currentUser.email, JSON.stringify(currentUser))`).
5. **TEXT CLEANUP:** Always clean strings (remove Arabic Teshkeel) before comparing text in the Speech Engine.