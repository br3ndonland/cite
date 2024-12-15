# Zotero notes

Brendon Smith ([br3ndonland](https://github.com/br3ndonland))

These notes are available in a [public GitHub repository](https://github.com/br3ndonland/cite).

## Table of Contents <!-- omit in toc -->

- [Description](#description)
- [Settings](#settings)
  - [General pane](#general-pane)
  - [Sync pane](#sync-pane)
  - [Advanced pane](#advanced-pane)
- [Plugins](#plugins)
  - [General](#general)
  - [ZotMoov](#zotmoov)
  - [ZotFile](#zotfile)
- [Import](#import)
  - [DOIs](#dois)
  - [Browser](#browser)
  - [PDF import](#pdf-import)
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

**Set up Zotero and [ZotMoov](#zotmoov) before adding articles.**

### General pane

#### File Handling

- [x] Automatically attach associated PDFs and other files when saving items _(if this box is checked, Zotero will automatically download PDFs when available)_
- [x] Automatically retrieve metadata for PDFs and ebooks
- [ ] Automatically take snapshots when creating items from webpages _(if this box is checked, Zotero will store a local copy of the webpage)_

#### [File Renaming](https://www.zotero.org/support/file_renaming)

- [x] Automatically rename locally added files
  - [x] PDF
  - [x] Ebook
  - [x] Image
  - [x] Audio
  - [x] Video
  - [x] Rename linked files

Default format template for renaming linked files:

```
{{ firstCreator suffix=" - " }}{{ year suffix=" - " }}{{ title truncate="100" }}
```

Custom format template for renaming linked files:

```
{{ if {{ authors }} == {{ authors max="3" }} }}
{{ authors case="snake" join="_" name="family" suffix="_" }}
{{ else }}
{{ authors case="snake" join="_" max="1" name="family" suffix="_et_al_" }}
{{ endif }}
{{ year suffix="_" }}
{{ title case="snake" replaceFrom="(.*)([\.:?!]| - )(.*)" replaceTo="$1" truncate="80" }}
```

This custom format template attempts to match the previous [ZotFile setting](#zotfile-settings). Notes:

- General
  - The format template is sensitive to spaces between template fields, but is not sensitive to newlines (linebreaks/linefeeds).
  - See the [Zotero test suite](https://github.com/zotero/zotero/blob/e80b5787fe13a093011264d9ccc3f0533a660cfc/test/tests/attachmentsTest.js#L1434) for examples.
- Authors
  - Zotero supports multiple variables for referencing authors, including `authors` and `firstCreator`. Note that the value of `firstCreator` is actually the _first two authors_, and the `et al.` format for when there are three or more authors is not easily configurable (though it can be changed with `replaceFrom` and `replaceTo` as suggested in the [Zotero forums](https://forums.zotero.org/discussion/comment/472407)).
  - See the [Zotero forums](https://forums.zotero.org/discussion/117442/filename-renaming-with-multiple-authors) for more suggestions.
- Title
  - `title case="snake"` lowercases all words and separates each word with `_`.
  - The `replaceFrom` and `replaceTo` fields seen in the custom format template will automatically truncate the title at characters like `:`. This is similar to the behavior of the ZotFile setting "Truncate title after `.` or `:` or `?`" ([source code](https://github.com/jlegewie/zotfile/blob/7b2c98b5a08ddfcfdcc99f6d3fa1a8aff776eb01/chrome/content/zotfile/wildcards.js#L66-L69)).
  - The behavior of the `truncate` field is slightly different from how ZotFile truncated titles. Zotero will truncate at the given limit, regardless of the final character in the title. ZotFile actually truncated at _the last word before the character limit_ due to a non-configurable `truncate_smart` setting ([source code](https://github.com/jlegewie/zotfile/blob/7b2c98b5a08ddfcfdcc99f6d3fa1a8aff776eb01/chrome/content/zotfile/wildcards.js#L79-L83)).

#### Miscellaneous

- [ ] Automatically tag items with keywords and subject headings _(if this box is checked, note that keywords and subject headings are not standardized and will be messy)_

### Sync pane

#### Data syncing

- [ ] Sync automatically
- [x] Sync full-text content

#### File syncing

- [ ] Sync attachment files in my library
- [ ] Sync attachment files in group libraries

### Advanced pane

- Files and folders
  - [Linked attachment base directory](https://www.zotero.org/support/preferences/advanced#linked_attachment_base_directory): file path to folder with PDFs. If you set this to a folder you use with cloud storage, Zotero will be able to access files on all your computers.

## Plugins

### General

Note that the [Zotero plugins directory](https://www.zotero.org/support/plugins) is usually outdated. It is usually more effective to [search GitHub](https://github.com/search?q=zotero+plugin&type=repositories) and download `.xpi` plugin files.

After downloading the desired `.xpi` file, install it by navigating to Tools -> Plugins, then clicking the gear icon (⚙), then "Install Plugin From File."

### ZotMoov

#### ZotMoov intro

[ZotMoov](https://github.com/wileyyugioh/zotmoov) helps automatically move and organize file attachments when they are added to a Zotero library.

#### ZotMoov settings

_Zotero Settings -> ZotMoov_

Directory to Move/Copy Files To: _set to same directory as "[linked attachment base directory](https://www.zotero.org/support/preferences/advanced#linked_attachment_base_directory)"_

Other Settings

- File Behavior: `Move`
- [x] Automatically Move/Copy Files When Added
- [x] Automatically Move/Copy Files to Subdirectory
  - [Subdirectory String](https://github.com/wileyyugioh/zotmoov/blob/master/docs/WILDCARD_INFO.md): `/{%w}/{%y}`
- [x] Automatically Delete External Linked Files in the ZotMoov Directory

Allowed File Extensions

- Defaults
  - [`djvu`](https://en.wikipedia.org/wiki/DjVu)
  - `docx`
  - `epub`
  - `pdf`
- Custom
  - `aac`
  - `jpeg`
  - `jpg`
  - `m4a`
  - `m4v`
  - `mkv`
  - `mp3`
  - `mp4`
  - `png`
- Wildcards do not appear to be supported, so for JPEG files for example, `jpeg` and `jpg` may need to both be added.

#### Migrating from ZotFile

[ZotFile](#zotfile) is not compatible with Zotero 7 ([jlegewie/zotfile#655](https://github.com/jlegewie/zotfile/issues/655)). [ZotMoov](#zotmoov) can be used instead.

The [ZotMoov README FAQ](https://github.com/wileyyugioh/zotmoov?tab=readme-ov-file#faq) provides some notes for migrating from ZotFile. Additionally, note that ZotMoov does not have its own file renaming rules like ZotFile did. The [new file renaming rules introduced in Zotero 7](#general-pane) can be used instead.

### ZotFile

#### ZotFile intro

The [ZotFile plugin](http://zotfile.com/) helped organize and rename files (like downloaded PDFs).

**UPDATE:** ZotFile is not compatible with Zotero 7 ([jlegewie/zotfile#655](https://github.com/jlegewie/zotfile/issues/655)). [ZotMoov](#zotmoov) can be used instead.

#### ZotFile settings

_Tools -> ZotFile preferences_

- General settings pane
  - Source folder for attaching new files: leave unchanged
  - Location of files:
    - [x] Custom location: add your "linked attachment base directory"
    - [x] Use subfolder defined by: `/%w/%y`
- Renaming rules pane
  - Renaming format:
    - [ ] Use Zotero to rename
    - Format: `{%a_}{%y_}{%t}`
  - Additional Settings
    - Delimiter between multiple authors: `_` (underscore)
    - [ ] Add user input to filename
    - [x] Change to lower case
    - [x] Replace blanks
    - [x] Truncate title after `.` or `:` or `?`
    - [x] Maximum length of title: `80` (ZotFile actually truncated the title to the length before the last space)
    - [x] Maximum number of authors: `3`
    - [x] Number of authors to display when authors are omitted: `1`
    - [x] Add suffix when authors are omitted: `_et_al`
- Attaching PDFs with ZotFile - To attach a file (such as a PDF) to an article entry in Zotero:
  - Right click or control+click on the article entry in the Zotero window
  - Add attachment -> Attach link to file. This will link the file, but not move it yet.
  - Right click or control+click again
  - Manage attachments -> Rename file. ZotFile will move and rename the file.

## Import

### DOIs

The best way to import new articles is by pasting the DOI into the magic wand box in the toolbar. It will automatically download PDFs if available.

### Browser

The browser extension is fast and effective. When browsing a webpage with an article you want to add, simply click the Zotero browser icon. It helps to have Zotero running beforehand.

### PDF import

- [Retrieving PDF metadata](https://www.zotero.org/support/retrieve_pdf_metadata) is not Zotero's strongest feature.
- If you have a folder full of PDFs to import:
  - Navigate to the add new item toolbar button (green plus sign) -> Link to File.
  - Select all the PDFs when they appear in the Zotero window
  - Right click -> Retrieve Metadata for PDFs

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

- There is no way to include nested tags (subtags). I compromise by putting a forward slash in each tag to indicate a subtag, and adding the higher-level tag manually. For example, for an article about fasting (a sub-field of metabolism), I would tag the article with `metabolism` and `metabolism/fasting`.
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

  - [Batch edit publication titles](script/zotero-batch-edit-publication.js): Mendeley (previous reference manager) did a terrible job with article metadata. One of the issues was that the same journal would sometimes have several titles (_Nature Reviews Molecular Cell Biology, Nature reviews. Molecular cell biology, Nat Rev Mol Cell Biol,_ etc). This script can replace incorrect titles with correct ones.

  - [Batch edit article titles](script/zotero-batch-edit-advanced.js): When I migrated from Mendeley to Zotero, Mendeley inserted awful escaped Greek characters into the title and abstract of many articles:
    - alpha -> `$\backslashalpha{\{}\backslash{\$}{\}}`
    - beta -> `$\backslashbeta{\{}\backslash{\$}{\}}`
    - gamma -> `$\backslashgamma{\{}\backslash{\$}{\}}`
    - delta -> `$\backslashdelta{\{}\backslash{\$}{\}}`
    - kappa -> `$\backslashkappa{\{}\backslash{\$}{\}}`

## TODOs and feature requests

- [x] Batch tagging articles -> select articles in the Zotero window, drag onto tags in the sidebar.
- [x] eLife articles are coming through as webpages. Any eLife page with an articles URI like `https://elifesciences.org/articles/{ID}` should be saved by Zotero as a journal article.
- [ ] Nested tags
- [ ] Switchable sidebar for authors and journals like Mendeley has.
- [ ] Set [linked file attachment base directory](https://www.zotero.org/support/preferences/advanced#linked_attachment_base_directory) per-library. Want each library in its own folder.
- [ ] Settings sync
