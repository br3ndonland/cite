# Zotero notes

Brendon Smith ([br3ndonland](https://github.com/br3ndonland))

These notes are available in a [public GitHub repository](https://github.com/br3ndonland/cite).

## Table of Contents <!-- omit in toc -->

- [Description](#description)
- [Settings](#settings)
- [Import](#import)
  - [Browser](#browser)
  - [PDFs](#pdfs)
  - [Mendeley](#mendeley)
- [Viewing and tagging articles](#viewing-and-tagging-articles)
- [Citations](#citations)
  - [Citation styles](#citation-styles)
  - [Citing articles](#citing-articles)
- [Developer resources](#developer-resources)
  - [Documentation](#documentation)
  - [JavaScript API](#javascript-api)
- [TODOs and feature requests](#todos-and-feature-requests)

## Description

- [Zotero](https://www.zotero.org/) is a non-profit project that provides citation manager software.
- The Zotero native app is available on Mac, Windows, and Linux.
- [ZoteroBib](https://zbib.org/) is a lightweight citation manager for use in the browser.

## Settings

**Set up Zotero before adding articles.**

- Zotero settings menu
  - Uncheck "Automatically take snapshots"
  - Uncheck "Automatically tag items with keywords and subject headings"
  - Set [linked file attachment base directory](https://www.zotero.org/support/preferences/advanced#linked_attachment_base_directory) to location with PDFs (like Google Drive or Dropbox).
- Auto organize and rename files (like downloaded PDFs) with the [ZotFile plugin](http://zotfile.com/)
  - [Install ZotFile](http://zotfile.com/#how-to-install--set-up-zotfile):
    - Download from the website
    - In Zotero: Tools -> Add-ons -> Install from file
  - Set up ZotFile preferences in Tools -> ZotFile preferences:
    - Source folder for attaching new files: leave unchanged
    - Location of files: add custom file location (your "linked file attachment base directory")
    - Use subfolders for journal and year (`/%w/%y`)
    - Renaming rules: uncheck "Use Zotero to Rename" and add file rename rules to your preferences.
  - **To attach a file:**
    - Right click or control+click on the file in the Zotero window
    - Add attachment -> Attach link to file. This will link the file, but not move it yet.
    - Right click or control+click again
    - Manage attachments -> Rename file. This will move and rename the file.

## Import

### Browser

The browser extension is fast and effective. When browsing a webpage with an article you want to add, simply click the Zotero browser icon. It helps to have Zotero running beforehand.

### PDFs

It's a little difficult to import from pre-downloaded PDFs. The best solution is to paste the DOI into the magic wand box above the article pane.

### Mendeley

Zotero has Mendeley import, but **Zotero can only import from Mendeley 1.18 or older.** My initial import took about 20 hours for ~20K articles.

**DO THESE STEPS BEFORE IMPORTING FROM MENDELEY TO ZOTERO:**

- **Delete escaped Greek characters from Mendeley BibTeX**:
  - Mendeley BibTeX escapes Greek characters. Beta is stored as `$\backslashbeta{\{}\backslash{\$}{\}}`. If you don't delete this before import, you will have to manually correct it later.
  - Open Mendeley BibTeX file in text editor.
  - Search for `$\backslash` (the beginning of the escape sequence) and replace with nothing.
  - Search for `{\{}\backslash{\$}{\}}` (the end of the escape sequence) and replace with nothing.
- **Convert Mendeley tags to keywords and delete metadata keywords from Mendeley BibTeX**. Zotero mixes tags and keywords when importing from BibTeX. Steps:

  - Open Mendeley BibTeX file in text editor.
  - Search by regular expression (regex):

    ```text
    /{(.*?)},\n\bmendeley-tags = /g
    ```

  - Replace with nothing (delete all). This should get rid of most of the metadata keywords. Zotero still seemed to be importing some keywords, although I had told it not to.

- **Roll back Mendeley to 1.18.** See [support article](https://www.zotero.org/support/kb/mendeley_import) for info on import:
  > Zotero includes support for directly importing a Mendeley database into Zotero via File → "Import…", but due to recent changes by Elsevier, the company that produces the Mendeley software, some extra steps may be required.
  >
  > Mendeley 1.19 and later have begun encrypting the local database, making it unreadable by Zotero and other standard database tools. Elsevier made this change a few months after Zotero publicly announced work on an importer, despite having long touted the openness of its database format as a guarantee against lock-in. At the same time, Mendeley continues to import data from Zotero’s own open database, as it has since 2009.
  >
  > The [Mendeley 1.19 release notes](https://www.mendeley.com/release-notes/v1_19) claimed that the encryption was for "improved security" on shared machines, yet applications rarely encrypt their local data files, as file protections are generally handled by the operating system with account permissions and full-disk encryption, and anyone using the same operating system account or an admin account can already install a keylogger to capture passwords. Elsevier later [stated](https://twitter.com/mendeley_com/status/1006915998841221120) that the change was required by new European privacy regulations — a bizarre claim, given that those regulations are designed to give people control over their data and guarantee data portability, not the opposite — and continued to assert, falsely, that full local export was still possible, while [repeatedly](https://twitter.com/mendeley_com/status/1006919608471818240) [dismissing](https://twitter.com/MendeleySupport/status/1006920802120470528) reports of the change as "#fakenews".
  >
  > Direct access to the Mendeley database is the only local way to export the full contents of one’s own research. The export formats supported by Mendeley don’t contain folders, various metadata fields (date added, favorite, and others), or PDF annotations. Mendeley offers a web-based API, but it only contains uploaded data, so relying on it would mean that anyone wanting to export their own data would first need to upload all their data and files to Elsevier’s servers. The API is under Elsevier’s control and can be changed or discontinued at any time.

## Viewing and tagging articles

- There is no way to include nested tags (subtags). I compromise by putting a dash in each tag to indicate a subtag, and adding the higher-level tag manually. For example, for an article about fasting (a sub-field of metabolism), I would tag the article with `metabolism` and `metabolism/fasting`.
- **I tag each article with the type of article, the topics, and the methods used.**
  - Type: `article/primary/basic`, `article/review`, etc
  - Topics: `cell/er`, `metabolism/fasting`, etc
  - Methods: `methods/cells/hepatocytes`, `methods/elisa/validation`, etc
- Command+click on the tag list in the sidebar to select multiple tags.
- There is a tiny box in the top right of the article pane where you can change columns and sorting.
- The "Related" tab can be used to link editorials with their corresponding original research articles.
- Syncing with the online account is very slow. It takes about 30 minutes for a library of >20K items without attachments.
- Detecting and resolving duplicates is very slow.

## Citations

### Citation styles

My personal citation style is available in [this public GitHub repo](./br3ndonland.csl). This citation style combines aspects of the Nature and BioMed Central (BMC) styles. The style is concise yet informative, light on punctuation and formatting, and designed for electronic viewing. DOI HTTPS hyperlinks are provided. I would prefer to hyperlink the article title instead of providing a bare URL, but CSL/XML don't allow for hyperlinking, and some users may want plain text. Journal volume and page numbers are no longer relevant and have been removed. In addition to the style specifications, I use sentence case for article titles and title case for journal titles.

You can download the style and import it with File -> Preferences -> Cite, then click + and find the downloaded file.

If you want to format your own style, brace yourself and read on:

- Zotero uses [Citation Style Language](https://citationstyles.org/) (CSL), a specification for formatting citations. It is based on XML. The CSL spec is available at [docs.citationstyles.org](https://docs.citationstyles.org/en/stable/).
- Editing CSL styles is cumbersome, and not designed for the modern web.
  - XML is like a worse version of HTML. It has less features than HTML, and requires more effort to write.
  - It is difficult to include hyperlinked text in CSL styles. For example, I like to have article titles hyperlinked through doi.org, like this: [Promoting an open research culture](https://doi.org/10.1126/science.aab2374). This is not possible with CSL, so I compromise by adding a bare DOI hyperlink to the end of each citation.
  - Their [visual editor](http://editor.citationstyles.org/visualEditor/) UI is awful.
- Check the [CSL validator](https://validator.citationstyles.org/) before importing the style into Zotero.

### Citing articles

- Microsoft Word
  - Use the Word plugin
- Plain text (copy/paste)
  - Select citations in Zotero
  - Right click -> Copy to Clipboard
  - Paste where desired

## Developer resources

### Documentation

- [GitHub](https://github.com/zotero/zotero)
- [Wiki](https://www.zotero.org/support/dev/source_code)
- [Forum](https://forums.zotero.org/)

### JavaScript API

- [Zotero wiki: Zotero JavaScript API](https://www.zotero.org/support/dev/client_coding/javascript_api)
- Tools -> Developer -> Run JavaScript
- See the [script/](script) directory for scripts I use.

## TODOs and feature requests

- ~~Batch tagging articles~~
- ~~eLife articles are coming through as webpages. Any eLife page with an articles URI like `https://elifesciences.org/articles/{ID}` should be saved by Zotero as a journal article.~~
- Nested tags
- Could use a switchable sidebar for authors and journals like Mendeley has.
- Set [linked file attachment base directory](https://www.zotero.org/support/preferences/advanced#linked_attachment_base_directory) per-library. Want each library in its own folder.
- Settings sync
