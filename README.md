
# 💌 Send With SES - Drag and Drop HTML Email Designer - Truly free and open source.

> **Responsive HTML emails that work in (almost) every email client.** 

> **Pure HTML. No intermediate code wranglers like mjml.**

> **Fast and Light Weight - under 1 MB (excluding dependencies).** 

> **Unleash your creativity, not your wallet!**

![SEND-WITH-SES (1)](https://github.com/SendWithSES/Drag-and-Drop-Email-Designer/assets/3350646/de86ebaa-3f5b-4be7-bd55-99ad1905d729)

## ✨ Why Choose Send With SES Email Designer?

- **Truly Open Source:** Use it for personal use or commercial use or whatever.

- **Truly Free:** Because the ones that say 'free', are not.

- **Truly Works:** Because the ones that are free don't seem to work.

- **Truly Fast and Light Weight:** Because you have better things to do with your time.  

- **Truly Magical:** Design like a pro without coding headaches. Our minimal interface gets out of your way.
  
- **Three Template Types:** Create and save unlimited templates. 
  - **Drag and Drop Designer** - Start designing beautiful emails immediately. 
  - **HTML Code Editor (Coming Soon)** - Reuse HTML templates that you already have or code them from scratch.
  - **Plain Text Emails** - _'Minimalemalists'_. This is for you.  
    
- **Easy Integration:** Get HTML output that you can save as a template and use with Amazon SES or any email service provider. Because sending emails should be as smooth as designing them.

## 🚀 Built On Solid Foundation.
Send With SES Email Designer follows a few simple but solid patterns to achieve responsive and accessible HTML email that works in (almost) every email client. It is built upon the amazing work done by these people.

- Ted Goas - https://www.cerberusemail.com
- Nicole Merlin - https://www.emailwizardry.com.au
- Mark Robbins - https://www.goodemailcode.com

## 🎨 Live Demo.
Play around with the live demo at https://designer.sendwithses.org. You can design a template and send yourself a test email.


## Installation

Install via NPM:

```
npm install @send-with-ses/ng-email-designer
```

Or via YARN:

```
yarn add @send-with-ses/ng-email-designer
```

**Image Handling**

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
Spotted a bug or got an idea? Just open an issue.
