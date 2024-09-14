import puppeteer from "puppeteer";

const scrapefile = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    const page = await browser.newPage();

    await page.goto("https://www.scopus.com/search/form.uri#basic");
    await page.type(
      ".relativeWrapper_3e2f77 > .labelWrapper_3e2f77 > input",
      "machine learning"
    );
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll(".searchArea");
      return Array.from(items).map((item) => {
        const link = item.querySelector(".ddmDocTitle a");
        return {
          link: link ? link.href : "",
        };
      });
    });

    for (let result of results) {
      await page.goto(result.link);
      await page.waitForSelector(".Highlight-module__akO5D"); // Ensure page is fully loaded

      const data = await page.evaluate(() => {
        const docheadElement = document.querySelector(
          ".Highlight-module__akO5D"
        );
        const dochead = docheadElement ? docheadElement.innerText : "";

        const publicationInfoBar = document.querySelector(
          'div[data-testid="publication-information-bar"]'
        );
        const journal = publicationInfoBar
          ? publicationInfoBar.querySelector("strong")?.innerText || ""
          : "";
        const year = publicationInfoBar
          ? publicationInfoBar
              .querySelector(".Typography-module__fRnrd:nth-child(3)")
              ?.textContent.trim() || ""
          : "";
        const journalAndYear = JSON.stringify({ journal, year });

        const abstractElement = document.querySelector(
          ".margin-size-16-y > div > p > span"
        );
        const abstract = abstractElement ? abstractElement.innerText : "";

        const documentType =
          document.querySelector(
            'dl[data-testid="source-info-entry-document-type"] dd'
          )?.textContent || "";
        const sourceType =
          document.querySelector(
            'dl[data-testid="source-info-entry-source-type"] dd'
          )?.textContent || "";
        const issn =
          document.querySelector('dl[data-testid="source-info-entry-issn"] dd')
            ?.textContent || "";
        const doi =
          document.querySelector('dl[data-testid="source-info-entry-doi"] dd')
            ?.textContent || "";

        const spanElements = document.querySelectorAll(
          ".Typography-module__lVnit"
        );
        const spanData = Array.from(spanElements).map(
          (span) => span.textContent
        );

        const affiliationSection = document.querySelector(
          "#affiliation-section"
        );
        const colleges = affiliationSection
          ? Array.from(affiliationSection.querySelectorAll("li")).map(
              (item) => ({
                name: item.querySelector("span")?.textContent || "",
                affiliation_associate_Symbol:
                  item.querySelector("sup")?.textContent.trim() || "",
              })
            )
          : [];
        const affiliationJson = JSON.stringify(colleges);

        const authorListContainer = document.querySelector(
          '[data-testid="author-list"]'
        );
        const authors = authorListContainer
          ? Array.from(authorListContainer.querySelectorAll("li")).map(
              (item) => {
                const authorName =
                  item.querySelector(".Button-module__Imdmt")?.textContent ||
                  "";
                const superscripts = Array.from(
                  item.querySelectorAll(".Author-module__WFeOX")
                ).map((superscript) => superscript.textContent);
                const authorEmail = item.querySelector('a[href^="mailto:"]');
                const email = authorEmail
                  ? authorEmail.href.replace("mailto:", "")
                  : null;
                return {
                  name: authorName,
                  author_associate_Symbol: superscripts,
                  email,
                };
              }
            )
          : [];
        const authorsJson = JSON.stringify(authors);

        return {
          dochead,
          journalAndYear,
          abstract,
          documentType,
          sourceType,
          issn,
          doi,
          spanData,
          affiliationJson,
          authorsJson,
        };
      });
      console.log(data);
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  }
};

scrapefile();
