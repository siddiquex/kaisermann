const REDIRECTS = [
  {
    aliases: ['github', 'repositories'],
    external: true,
    url: 'https://github.com/kaisermann',
  },
  {
    aliases: ['twitter', 'kiwi'],
    external: true,
    url: 'https://twitter.com/kiwistian',
  },
  {
    aliases: ['instagram', 'photos'],
    external: true,
    url: 'https://instagram.com/kiwistian',
  },
];

module.exports = class {
  data() {
    return {
      permalink: 'assets/pages.json',
    };
  }

  render({ collections }) {
    const localPages = collections.all
      .filter((i) => i.data.page.outputPath.endsWith('html'))
      .map((i) => {
        const { fileSlug } = i.data.page;
        const dataAliases = i.data.aliases;
        const aliases = [];

        if (fileSlug.length > 0) {
          aliases.push(fileSlug);
        }

        if (Array.isArray(dataAliases)) {
          aliases.push(...dataAliases);
        } else if (typeof dataAliases === 'string') {
          aliases.push(dataAliases);
        }

        return {
          aliases: Array.from(new Set(aliases)),
          fileSlug: i.data.page.fileSlug,
          url: i.data.page.url,
          external: false,
        };
      });

    const pages = [...localPages, ...REDIRECTS];

    return JSON.stringify(pages);
  }
};
