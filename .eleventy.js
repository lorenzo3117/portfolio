const sass = require("sass");
const path = require("path");

module.exports = function (eleventyConfig) {
    // Ignore non-site files
    eleventyConfig.ignores.add("README.md");

    // Copy assets to site
    eleventyConfig.addPassthroughCopy("assets/fonts");
    eleventyConfig.addPassthroughCopy("assets/images");

    // Sass compiler
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css", // optional, default: "html"

        // `compile` is called once per .scss file in the input directory
        compile: async function (inputContent, inputPath) {
            // Skip files like _fileName.scss
            let parsed = path.parse(inputPath);
            if (parsed.name.startsWith("_")) {
                return;
            }

            // Run file content through Sass
            let result = sass.compileString(inputContent, {
                loadPaths: [parsed.dir || "."],
                sourceMap: false // or true, your choice!
            });

            // Allow included files from @use or @import to
            // trigger rebuilds when using --incremental
            this.addDependencies(inputPath, result.loadedUrls);

            return async () => {
                return result.css;
            };
        },
    });
};