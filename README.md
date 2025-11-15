# KnowledgeDeck

KnowledgeDeck is a learning platform inspired by GRE-style flashcards, designed to help users build vocabulary and reinforce long-term memory through quizzes. The system allows learners to review, track, and revise words efficiently using a clean and intuitive interface. Built with React on the frontend and Node.js on the backend, it integrates Oracle as the database layer for reliable storage and retrieval.

**Frontend:** React

**Backend:** Node.js (Express)

**Database:** Oracle

## Features
Each word is accompanied by
• Its meaning,
• Parts of speech,
• Category (vocabulary or something else),
• Pronunciation audio,
• Example of usage in a sentence,
• An option to copy the word and its meaning to clipboard

- There are options for a logged in user to _bookmark_ a word for himself, or add a _note_ to it.
- Words are divided into easy, intermediate and difficult sections
- Besides, there is another section where words can be explored and learnt by topic (such as commerce, environment, food, geography, healthcare etc)
- The GUI has smooth transitions from one word to the next.
- Not only can the admin add or delete words to the flashcard system, but also a logged in user can add custom words for himself in a deck.
- All words in a deck are also arranged in a table. Users can search for a word using advanced search technique
- For each deck (easy/difficult/intermediate), there is a discussion section where a logged in user can add a comment
- Quizzes with multiple choice questions can test the skills of a user
- Features a **Daily Word** module that refreshes with a new vocabulary term each day to keep learning consistent.
- The system contains links to valuable resources such as GRE preparation books, websites, articles and video tutorials
- There is scope for a logged in user to contact the admin by email

## 📸 Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/95b5bb27-d2fa-4897-b4c3-35917bb38046" width="260" />
  <img src="https://github.com/user-attachments/assets/07a522d7-5645-4c3a-9dbf-8736c2052a68" width="260" />
  <img src="https://github.com/user-attachments/assets/84caed8e-0f9f-4b12-a7f4-dd2fcc2dba35" width="260" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d333cc7a-3a87-4c5a-a1b4-34fcc821bb1c" width="260" />
  <img src="https://github.com/user-attachments/assets/378ebc57-2e40-4a49-998c-bfa24492c6fa" width="260" />
  <img src="https://github.com/user-attachments/assets/befd9023-144c-47ec-883f-6ededc87b9d7" width="260" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/041f78c5-1724-4e19-b5d7-9f77b0c1ea7a" width="260" />
  <img src="https://github.com/user-attachments/assets/af12a551-5a08-4c3b-936d-8f1675291d30" width="260" />
  <img src="https://github.com/user-attachments/assets/ec20e89a-c6fd-4d6e-8562-7cdf071cc2ac" width="260" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/6387ae61-cb04-4b83-9f6d-fbe170c1284a" width="260" />
  <img src="https://github.com/user-attachments/assets/7b50d901-8148-4a5c-be02-9cf2f73a7e02" width="260" />
  <img src="https://github.com/user-attachments/assets/12c5a4a4-7739-4188-81a1-d696a1f53b55" width="260" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0dc104d7-d1c7-4bb7-b744-60eb3a3650f2" width="260" />
  <img src="https://github.com/user-attachments/assets/ca6a3ef4-ae7e-439e-a873-10f8f2e47a17" width="260" />
</p>


## Video Demonstration Link
https://youtu.be/3kwH9WNGIEk

## Usage
Login with the following credentials:
admin@gmail.com, password: 123

or to login as user (non-admin):
hasan@gmail.com or rishad@gmail.com, password: 123

cd server && node index

cd client && npm start

[or, cd client && npm install && npm start]
