# Citation, PDF management, and manuscript formatting tools

Brendon Smith ([br3ndonland](https://github.com/br3ndonland))

These notes are available in a [public GitHub repository](https://github.com/br3ndonland/cite).

## Table of Contents <!-- omit in toc -->

- [Citations](#citations)
  - [CSL](#csl)
  - [EndNote](#endnote)
  - [knitcitations](#knitcitations)
  - [Mendeley](#mendeley)
  - [Papers](#papers)
  - [PubSweet](#pubsweet)
  - [ReadCube](#readcube)
  - [ReadCube Dimensions](#readcube-dimensions)
  - [RefWorks](#refworks)
  - [ScienceFair](#sciencefair)
  - [Sente](#sente)
  - [Web annotations](#web-annotations)
  - [Zotero](#zotero)
- [Document interconversion](#document-interconversion)
  - [Pandoc](#pandoc)
- [Literature databases](#literature-databases)
  - [meta](#meta)
  - [PubMed](#pubmed)
  - [Sci-Hub](#sci-hub)
  - [Semantic Scholar](#semantic-scholar)
- [Next-generation open access journals](#next-generation-open-access-journals)

## Citations

### CSL

My personal citation style is available in [this GitHub repo](./br3ndonland.csl). This citation style combines aspects of the Nature and BioMed Central (BMC) styles. The style is concise yet informative, light on punctuation and formatting, and designed for electronic viewing. DOI HTTPS hyperlinks are provided. I would prefer to hyperlink the article title instead of providing a bare URL, but CSL/XML don't allow for hyperlinking. Journal volume and page numbers are no longer relevant and have been removed. In addition to the style specifications, I use sentence case for article titles and title case for journal titles.

You can download the style and import it into Zotero in File -> Preferences -> Cite, then click + and find the downloaded file.

If you want to format your own style, brace yourself and read on:

- Zotero uses [Citation Style Language](https://citationstyles.org/) (CSL), a specification for formatting citations. It is based on XML. The CSL spec is available at [docs.citationstyles.org](https://docs.citationstyles.org/en/stable/). Zotero also provides a [CSL editing guide](https://www.zotero.org/support/dev/citation_styles/style_editing_step-by-step).
- Editing CSL styles is cumbersome, and not designed for the modern web.
  - XML is like a worse version of HTML. It has less features than HTML, and requires more effort to write.
  - It is difficult to include hyperlinked text in CSL styles. For example, I like to have article titles hyperlinked through doi.org, like this: [Promoting an open research culture](https://doi.org/10.1126/science.aab2374). This is not possible with CSL, so I compromise by adding a bare DOI hyperlink to the end of each citation.
  - Their [visual editor](http://editor.citationstyles.org/visualEditor/) UI is awful.
- Check the [CSL validator](https://validator.citationstyles.org/) before importing the style into Zotero.

### EndNote

#### Pros

- Custom citation styles
- Term lists
- **Multiple bibliographies in the same document**
  - In Microsoft Word, break your document into sections
  - Modify the output style as needed
  - Format your Word document with the new output style

#### Cons

- **No tags.** Folders are not equivalent. You cannot select and view multiple folders simultaneously like you can with tags.
- No easy way to view articles by author or keyword.
- **Problems can arise when formatting citations in documents with tracked changes**
  - When track changes is on and text with EndNote citations is deleted, the citations will still be stored in the document and the reference list will not format properly. Word frequently crashes.
  - Only update citations when in "final" view mode (no markup). See Thomson Reuters knowledgebase article 108696 ("EndNote: Track Changes tracking EndNote Citation's field codes"). Do not use "final showing markup" or "simple markup."
  - To eliminate problematic references, use "edit and manage citations" to remove formatted references before deleting text. This will format your bibliography, so be prepared. Unformatted references can be deleted like regular text.
    - The references were properly formatted, but out of place.
    - Use the groups of references to guide you, and move them to the proper locations.
- **Term lists**
  - Sometimes journal titles are not abbreviated, even though I am using an output style that abbreviates them.
  - The journal titles in your references must match exactly with the titles in your terms list. If the titles are not the same (even if the same letters are not capitalized), EndNote will treat the journal name as a name that is not present in the terms list. You can edit the reference to match, or create a new term for the journal title as it appears in your downloaded references.
  - Moving terms (such as journal abbreviations) between libraries
    - Note that terms lists are specific to each library.
    - In the library with the terms you would like to export: Tools -> define term lists, select journals, click Export list. The list will be saved as a text file.
    - In the new library, Tools -> define term lists. You can delete the previous journals list

### knitcitations

- [knitcitations](https://github.com/cboettig/knitcitations) was written by [Carl Boettiger](https://www.carlboettiger.info/).

### Mendeley

I used Mendeley for years before switching to [Zotero](#zotero).

Pros

- Separates tags and keywords.

Cons

- Lock-in
  - Started encrypting the database, making it [difficult to import with Zotero](https://www.zotero.org/support/kb/mendeley_import).
- Speed
  - **Exceedingly slow**
  - Processes use inordinate amounts of CPU power
  - Takes 5-10 minutes to filter articles after initial app startup
  - Crashes constantly.
- Tags
  - Tags are created too quickly while typing.
- Search
  - Slow
  - Starts searching too quickly, so it searches your entire library for a single letter and slows everything down.
- Metadata

  - **Generally terrible at extracting metadata.** I have found it more efficient to just add every entry manually and look up the DOI. There was a time, with version 1.13.3, when metadata lookup didn't work at all for new articles. I had to go for months without being able to add articles to my library.
  - If an editorial references the original article prior to listing its own doi, Mendeley will pick up the original article’s doi. Example [here](https://elifesciences.org/articles/37009).
  - There isn't a good way to connect research articles and the editorials written about them. [Zotero](#zotero) has a "Related" feature for this.
  - Deleting metadata keywords:

    - Open mendeley BibTeX file in text editor.
    - Search by regular expression (regex):

      ```text
      /keywords = {(.*?)},\n/g
      ```

    - Replace with nothing (delete all).
    - Reinstall Mendeley and import BibTeX as described below.

- Citations
  - Uses CSL.
- PDFs
  - Deleting an article does not delete the associated PDF.
  - PDF viewer is totally inferior to Preview
- Export
  - Be sure to **enable BibTeX syncing** for export. Don't rely on the database. Mendeley started encrypting the database, making it [difficult to import with Zotero](https://www.zotero.org/support/kb/mendeley_import). See _[zotero.md](./zotero.md)_.
  - Mendeley to EndNote: Export RIS.
- Backing up and restoring Mendeley:
  - Make sure BibTeX syncing is enabled in Preferences -> BibTeX.
  - Edit the BibTeX file if you changed the location of your PDFs.
  - Delete your Mendeley account through their website.
  - Create a new Mendeley account through their website.
  - Reinstall Mendeley and sign in with your new account.
  - Click "Edit settings" and turn off PDF syncing.
  - In Preferences, specify the path for your PDFs, making sure it's the same as the path in the BibTeX file.
  - Specify the same folder and file naming system as before, so Mendeley doesn't have to re-title the PDFs.
  - Import the BibTeX file with Mendeley.
- **Owned by publishing magnate Elsevier.**

### Papers

Cons

- **Papers calls tags "keywords." This is a fatal flaw, because articles also contain keywords embedded in the metadata.** Metadata keywords are mixed together with custom keywords.
- You can only view one keyword at a time, unlike in Mendeley. This is another fatal flaw.
- Papers does not offer a built-in option for custom citation styles. Have to use the generic CSL editor at citationstyles.org, save the citation file to disk, and import. I would expect more from a paid program.

### PubSweet

- From Adam Hyde at Coko Foundation. See [Adam Hyde's post on xPub](https://www.adamhyde.net/what-is-xpub/).
- Coko Foundation's code is on [GitLab](https://gitlab.coko.foundation). It's poorly documented, not surprising considering Adam Hyde's [disdain for Markdown](https://www.adamhyde.net/whats-wrong-with-markdown/).

### ReadCube

- Info
  - ReadCube is a reference manager and online PDF viewer. It is integrated into the websites of many journals, making it easy to add articles.
  - Owned by [Digital Science](https://www.digital-science.com/), a venture capital firm which also owns Altmetric, Labguru, Papers, Symplectic, and TetraScience.
  - **Pushes users toward the subscription service.**
  - Premium account with unlimited cloud storage ~~\$50~~ \$55/year (price is going up).
- [Import](https://readcubesupport.freshdesk.com/support/solutions/articles/30000026491-how-do-i-import-from-my-library-from-another-reference-manager-into-readcube-endnote-sente-mendel)
  - **Does not import Mendeley tags.**
  - AI discovery features
    - It provides recommended articles, but they cannot be organized by publication date or journal.
- Tagging
  - **Tagging is premium-only.**
- Viewing
  - **Can only view one tag at a time like Papers. Fatal flaw.**
  - Can’t view by journal?
  - Hierarchical folders are not implied (so items in a subfolder do not automatically show up in the parent folder).
- Citing
  - It has its own SmartCite citation engine.
- Export
  - Can [export citations](https://readcubesupport.freshdesk.com/support/solutions/articles/30000024634-how-can-i-export-references-from-readcube-).
  - **Doesn't have features for library export.** They're trying to lock you in to a subscription.
- Discovering
- Collaborating
  - **Excellent [team features](https://www.readcube.com/teams).**

### ReadCube Dimensions

- Dimensions is an AI discovery platform integrated with ReadCube.
  - [Dimensions website](https://www.dimensions.ai/)
  - [Dimensions web app](https://app.dimensions.ai/)
  - [Dimensions info page](https://www.digital-science.com/products/dimensions/)

### RefWorks

Pros

- RefWorks was acquired by ProQuest and has been thoroughly updated.
- Good integration with library resources
- Cite while you write, available in Word store, has excellent integration. Entire library is accessible in the sidebar.
- Can sync documents with dropbox, although it has 100 GB built-in

Cons

- Less buggy than Mendeley, but also less powerful.
- **Doesn’t have the sorting interface of Mendeley.**
- When I tried it in ~2016, it could only display 100 articles at a time. I had login problems as well.
- If you want to edit PDFs, you would have to do it in the RefWorks interface in order to retain the edits in your account.
- I’m not sure if you can attach a PDF to a pre-existing reference.
- Merging documents is difficult.

### ScienceFair

- [ScienceFair](https://sciencefair-app.com/) is like eLife Desktop.
- Uses eLife's [Lens reader](https://github.com/elifesciences/lens), which renders JATS-XML.
- Decentralized p2p system built on the [dat protocol](https://dat.foundation/).
- Originally only had eLife as a data source, but now integrates multiple data sources.

### Sente

- Sente is another citation manager. I tried it once and didn’t end up using it. I think it was because it wasn't worth the additional cost over Mendeley. However, after becoming increasingly frustrated with Mendeley and not being able to migrate to Papers because of the keywords, I reconsidered Sente in 2015.
- Import
  - It is difficult to update incorrect article metadata. You have to open the PDF, then click the AutoLinks button. If incorrect information was retrieved, you cannot enter a new PMID and DOI and click lookup like in Mendeley, so it becomes even more difficult.
- Viewing documents
  - Their QuickTags “powerful and flexible classification system” only allows you to view one tag at a time, like Papers. Fatal flaw.
  - Browsing by author, publication, etc is not quite as easy as in Mendeley or Papers. There is a filter box above the documents grid, instead of in the sidebar. It refreshes awkwardly.
  - Drop down menus are slow.
  - Clicking on a QuickTag in the sidebar also results in an awkward refresh of the document grid.
  - You can’t set Sente to open a PDF in an external application. You have to open in Sente, then click PDF at the top, then click Reveal in Finder.
  - Built-in PDF viewer doesn’t recognize links. I would prefer to use Preview. There is no good way to open PDFs in Preview from within Sente. The PDF viewer is slow.
- Support
  - I posted on the Sente support site and no one responded. Response times vary widely.

### Web annotations

- [hypothes.is](https://web.hypothes.is/): Used by eLife. See Enabling scientific discussion on eLife with Hypothesis.
- [Remarq](https://www.redlink.com/remarq-2/): Another commenting engine.

### Zotero

See _[zotero.md](./zotero.md)_.

## Document interconversion

### Pandoc

#### Comments

- [Pandoc](https://pandoc.org/) is a document interconversion engine written in Haskell by [John MacFarlane](https://johnmacfarlane.net).
- Pandoc includes a citation engine that inserts bibliographies at the end of the document.

#### Resources

- [John MacFarlane](https://johnmacfarlane.net): Created pandoc in Haskell.
- [vscode-pandoc](https://marketplace.visualstudio.com/items?itemName=DougFinke.vscode-pandoc) from [Doug Finke](https://github.com/dfinke) (not a Pandoc core contributor): Just formats document output, no citations
- [Pandoc Citer](https://marketplace.visualstudio.com/items?itemName=notZaki.pandocciter)
  - Autocompletes citations stored in a BibTeX document for `pandoc-markdown`.
    > This extension is essentially a stripped down version of the LaTeX-Workshop extension that has been repurposed for markdown/pandoc.
- [citation.js](https://citation.js.org/)

## Literature databases

### meta

- [Meta](https://www.meta.org/) is an AI platform acquired by Chan Zuckerberg initiative (czi).
- It's sort of like a feed aggregator for science journals.
- Was originally an independent company, then it was acquired by czi. It took them years to re-release the software, and yet it's still in beta as of 2020.

### PubMed

- [PubMed](https://pubmed.ncbi.nlm.nih.gov/) is the go-to database for scientific and medical literature.
- It is federally funded and maintained by the National Center for Biotechnology Information (NCBI).
- In addition to offering the ability to search over 30 million citations instantly, it also offers [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/about/intro/), a database with the full text of 5 million articles.
- You can read about the PubMed 2.0 redesign in [eLife](https://elifesciences.org/articles/28801).

### Sci-Hub

- Russian pirate site that allows users to download almost any scientific journal article for free
- Formerly at [sci-hub.tw](https://sci-hub.tw)
- Currently at [sci-hub.zone](https://sci-hub.zone/) and mirrored at [sci-hub.ren](https://sci-hub.ren/), see [Wikipedia](https://en.wikipedia.org/wiki/Sci-Hub) for full list of URLs
- News coverage
  - [The Atlantic: The research pirates of the dark web](https://www.theatlantic.com/technology/archive/2016/02/the-research-pirates-of-the-dark-web/461829/)
  - [The Guardian: Is the staggeringly profitable business of scientific publishing bad for science?](https://www.theguardian.com/science/2017/jun/27/profitable-business-scientific-publishing-bad-for-science)
  - [The Verge: Meet the pirate queen making academic papers free online](https://www.theverge.com/2018/2/8/16985666/alexandra-elbakyan-sci-hub-open-access-science-papers-lawsuit)
- The [Greene lab at Penn](http://www.greenelab.com/) published an [analysis of Sci-Hub](https://elifesciences.org/articles/32822).
- Why don’t they make sci-hub decentralized? Could combine it with [ScienceFair](https://sciencefair-app.com/).

### Semantic Scholar

- [Semantic Scholar](https://www.semanticscholar.org/) is made by the Allen Institute for Artificial Intelligence ([AI2](https://allenai.org/))
- Heard about it via the [Changelog Practical AI podcast episode 76](https://changelog.com/practicalai/76) with Doug Raymond.
- Used to create [Supp.AI](https://supp.ai/), a database of supplement-drug interactions.
- Website only offers login through OpenID Athens (academic institutions), Google, Facebook, or Twitter. I don't have any of those services, so I can't even log in.

## Next-generation open access journals

This is a list of journals that go beyond conventional open-access, and that are not owned by publishing magnates like Elsevier or Springer Nature.

- [bioRxiv](https://www.biorxiv.org/)
- [eLife](https://elifesciences.org/)
- [JOSE](https://jose.theoj.org/)
- [JOSS](https://joss.theoj.org/)
- [PeerJ](https://peerj.com/)
- [ScienceMatters](https://www.sciencematters.io/)
