"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdfGenerator_1 = require("./pdfGenerator");
const pptxGenerator_1 = require("./pptxGenerator");
const docxGenerator_1 = require("./docxGenerator");
class Generator {
    createPDF(filepath, cbCreate) {
        pdfGenerator_1.default.generate(filepath, cbCreate);
    }
    createDOCX(filepath, cbCreate) {
        var docxGenerator = new docxGenerator_1.default();
        docxGenerator.generate(filepath, cbCreate);
    }
    createPPTX(filepath, cbCreate) {
        var pptxGenerator = new pptxGenerator_1.default();
        pptxGenerator.generate(filepath, cbCreate);
    }
}
exports.default = new Generator();
