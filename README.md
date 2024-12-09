
# 💌 Free, Open Source HTML Email Editor and Designer.

![sendwithses-opensource-drag-and-drop-html-editor](https://github.com/SendWithSES/Drag-and-Drop-Email-Designer/assets/3350646/86020ce2-a818-4b7f-8823-f5c898b737ee)

## 👹 Who?
This email designer was originally built for use within [**SENDUNE**](https://sendune.com/) (formerly Send With SES).

## ⁉️ Why Choose SENDUNE Email Designer?

- **Truly Open Source:** Use it for personal use or commercial use or whatever.
- **Truly Free:** Because the ones that say 'free', are not.
- **Truly Works:** Because the ones that are free don't seem to work.
- **Truly HTML:** No intermediate code wranglers like mjml. 
- **Truly Fast and Light Weight:** Because you have better things to do with your time.  
- **Truly No-Code:** Design like a pro without coding headaches. Our minimal interface gets out of your way.
- **Truly Democratic:** Save HTML output as a template and use with ANY email service provider.
  
## 3️⃣ Three Ways To Create Templates
Comes with three template types that let you design any kind of transactional or marketing emails. Altogther, you can create and save unlimited templates. 
  - **Drag and Drop Designer** - Start designing beautiful emails immediately. 
  - **HTML Code Editor** - Reuse HTML templates that you already have or code them from scratch.
  - **Plain Text Emails** - _'Minimalists'_. This is for you.  

## 🚀 Built On Solid Fundamentals.
Follows a few fundamental rules to design emails that work in nearly all email clients (web and mobile). It is built upon some great work done by these people.

- Ted Goas - https://www.cerberusemail.com
- Nicole Merlin - https://www.emailwizardry.com.au
- Mark Robbins - https://www.goodemailcode.com

## 🎪 Live Demo.
Play around with the live demo at https://designer.sendune.com. You can design a template and send yourself a test email.

## 👩‍💻 Installation

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/sendune)

(This StackBlitz demo is built with Angular 15. The same process should work with other Angular versions.)

Install via NPM:

```
npm install @send-with-ses/ng-email-designer
```

Or via YARN:

```
yarn add @send-with-ses/ng-email-designer
```

## 🖼️ Image Handling

You can use a cloud storage of your choice (ex: AWS S3, Cloudflare R2, GCP Cloud Storage etc) for storing your images. Please implement your image upload functionality and provide it to the library as below (imageUploadTriggered/imageSelectionTriggered).


```html
<lib-email-designer #emailEditor class="px-0"
        [type]="selectedTemplateType" [template]="selectedTemplate"
        (imageSelectionTriggered)="onImageSelectionTrigger($event)"
        (imageUploadTriggered)="onImageUploadTrigger($event)"
        (emailContentChanged)="onEmailContentChange($event)"
        >
</lib-email-designer>
```
[Click here](https://www.npmjs.com/package/@send-with-ses/ng-email-designer) for more documentation

## 🎨 UI Theming and Styles

You can make a few changes to make the Email Designer match your website colors.

Import the following styles into your global styles file (e.g., styles.scss):

```css
@import '../node_modules/@send-with-ses/ng-email-designer/src/lib/theme.scss';
@import '../node_modules/@send-with-ses/ng-email-designer/src/lib/email-editor.css';
```

To make the Email Designer match your website's UI, include the following in your main.scss or styles.scss file and change the colors as you like.

```css
 :root {
    --sws-icon-color: #ccc;
    --sws-icon-hover-color: #555;
    --sws-header-background: #eee;
    --sws-header-text-color: #555;
    --sws-border-color: #ccc;
 }
```

## 🤝 Contribute.
Feel free to fork the repository, make improvements, and submit pull requests.

## 🐛 Issues or Ideas:
Spotted a bug or got an idea? Just open an issue or write to designer at sendwithses dot org.

## ⭐ Minimal Rationalism (Optional Reading)
SENDUNE Designer focuses on simplicity and ease of use over a heavy feature set. Over years of sending emails, we've come across some email patterns that work and many that don't. Some are design related while some are organisation related. Let's break some bubbles here - in no particular order.
- Remember, you are designing an email, not a website. If you want fine-grain controls like 'line heights', you are at the wrong place.
- The more you nitpick on the design, the more likely it will break in email clients. (i.e. more moving parts == more breakages). 
- Transactional emails are best delivered in plain text.
- For best results, HTML emails (transactional and marketing) must (mostly) fit ['above the fold'](https://en.wikipedia.org/wiki/Above_the_fold).
- Rethink your design if it is more than one scroll depth.
- The combined time spent by all the recipients who opened your marketing email will be lesser than the time you spent designing it. (This statement is an exaggeration, but you get the drift.)
- Emails are being designed to impress bosses, not the end readers.
- Avoiding spam folders is largely a function of the content of your email. Technology or the pedigree of your email sending service cannot help you if your content is unsolicited.
- The top three email service providers control ~80% of the market. They can break you.  
