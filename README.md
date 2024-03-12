
# 💌 Send With SES - HTML Email Designer.

![sendwithses-opensource-drag-and-drop-html-editor](https://github.com/SendWithSES/Drag-and-Drop-Email-Designer/assets/3350646/86020ce2-a818-4b7f-8823-f5c898b737ee)

## ✨ Why Choose Send With SES Email Designer?

- **Truly Open Source:** Use it for personal use or commercial use or whatever.

- **Truly Free:** Because the ones that say 'free', are not.

- **Truly Works:** Because the ones that are free don't seem to work.

- **Truly HTML:** No intermediate code wranglers like mjml. 

- **Truly Fast and Light Weight:** Because you have better things to do with your time.  

- **Truly No-Code:** Design like a pro without coding headaches. Our minimal interface gets out of your way.

- **Truly Democratic:** Save HTML output as a template and use with ANY email service provider.
  
## 3️⃣ Three Template Types
Comes with three template types that let you design any kind of transactional or marketing emails. Altogther, you can create and save unlimited templates. 
  - **Drag and Drop Designer** - Start designing beautiful emails immediately. 
  - **HTML Code Editor** - Reuse HTML templates that you already have or code them from scratch.
  - **Plain Text Emails** - _'Minimalemalists'_. This is for you.  

## 🚀 Built On Solid Fundamentals.
Send With SES Email Designer follows a few simple but solid patterns to achieve responsive and accessible HTML email that works in (almost) every email client. It is built upon some fundamental email design concepts laid down by these people.

- Ted Goas - https://www.cerberusemail.com
- Nicole Merlin - https://www.emailwizardry.com.au
- Mark Robbins - https://www.goodemailcode.com

## 🎨 Live Demo.
Play around with the live demo at https://designer.sendwithses.org. You can design a template and send yourself a test email.

## 👩‍💻 Installation

Install via NPM:

```
npm install @send-with-ses/ng-email-designer
```

Or via YARN:

```
yarn add @send-with-ses/ng-email-designer
```

## 🖼️ Image Handling

Images can be directly uploaded to a cloud storage of your choice (ex: AWS S3, Cloudflare R2, GCP Cloud Storage etc).

```html
<lib-email-designer #emailEditor class="px-0"
        [type]="selectedTemplateType" [template]="selectedTemplate"
        (imageSelectionTriggered)="onImageSelectionTrigger($event)"
        (imageUploadTriggered)="onImageUploadTrigger($event)"
        (emailContentChanged)="onEmailContentChange($event)"
        >
</lib-email-designer>
```

Please implement your image upload functionality and provide it to the library as above (imageUploadTriggered/imageSelectionTriggered).

[Click here](https://www.npmjs.com/package/@send-with-ses/ng-email-designer) for more documentation
## 🤝 Contribute.
Feel free to fork the repository, make improvements, and submit pull requests.

## 🐛 Issues or Ideas:
Spotted a bug or got an idea? Just open an issue or write to designer at sendwithses dot org.
