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
var slide;
var pObj;
class PPTGenerator {
    constructor() {
        this.pptx = officegen('pptx');
    }
    generate(outputPath, cbGenerate) {
        this.pptx.on('finalize', function (written) {
            // console.log('Finish to create a PowerPoint file.\nTotal bytes created: ' + written + '\n');
            // clear the temporatory files
        });
        this.pptx.on('error', function (err) {
            console.log(err);
            return cbGenerate(err);
        });
        this.pptx.setDocTitle('Sample PPTX Document');
        slide = this.pptx.makeNewSlide();
        slide.name = 'The first slide!';
        slide.addText(outputPath);
        var out = fs.createWriteStream(outputPath)
            .on('error', function (err) {
            console.log(err);
            return cbGenerate(err);
        })
            .on('close', function () {
            // console.log ( 'Finish to create a PPTX file.' );
            return cbGenerate();
        });
        this.pptx.generate(out);
    }
}
exports.default = PPTGenerator;
