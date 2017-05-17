"use strict";
/* TYPESCRIPT GENERATED FILE */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TODO - Fix "any" parameters
 */
var async = require('async');
var officegen = require('officegen');
var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var path = require('path');
var themeXml = fs.readFileSync(path.resolve(__dirname, 'themes/testTheme.xml'), 'utf8');
class DOCXGenerator {
    constructor() {
        this.docx = officegen({
            type: 'docx',
            orientation: 'portrait'
            // The theme support is NOT working yet...
            // themeXml: themeXml
        });
    }
    generate(outputPath, cbGenerate) {
        this.docx.on('error', function (err) {
            console.log(err);
            return cbGenerate(err);
        });
        var pObj = this.docx.createP();
        pObj.addText(outputPath);
        var out = fs.createWriteStream(outputPath)
            .on('error', function (err) {
            console.log(err);
            return cbGenerate(err);
        })
            .on('close', function () {
            // console.log ( 'Finish to create a DOCX file.' );
            return cbGenerate();
        });
        this.docx.generate(out);
    }
}
exports.default = DOCXGenerator;
