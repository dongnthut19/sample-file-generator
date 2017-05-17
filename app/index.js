"use strict";
/* TYPESCRIPT GENERATED FILE */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const async = require('async');
const outputDir = './output';
const generator_1 = require("./generator");
const settings = require('./config.json');
async.auto({
    resetDirectory: function (cbResetDirectory) {
        fs.emptyDir(outputDir, function (errRemove) {
            if (errRemove) {
                console.log('errRemove = ', errRemove);
                return cbResetDirectory();
            }
            fs.ensureDir(outputDir, function (errEnsureDir) {
                if (errEnsureDir) {
                    console.log('errEnsureDir = ', errEnsureDir);
                    return cbResetDirectory();
                }
                return cbResetDirectory();
            });
        });
    },
    generateSamples: ['resetDirectory', function (results, cbGeneratorSamples) {
            recurseCreateFolder(outputDir, '', 0, 0, settings['folders-per-level'], function (errCreateFolder) {
                if (errCreateFolder) {
                    console.log('errCreateFolder = ', errCreateFolder);
                }
                console.log('done');
            });
            function recurseCreateFolder(folderPath, filenamePrefix, level, currentCount, total, cbCreateFolder) {
                var newFolder = folderPath + '/' + currentCount;
                console.log('newFolder = ', newFolder);
                var tempFilename = filenamePrefix;
                if (tempFilename.length > 0)
                    tempFilename = filenamePrefix + '_';
                var newFilenamePrevix = tempFilename + currentCount;
                fs.ensureDirSync(newFolder);
                recurseCreateSamples(newFolder, newFilenamePrevix, 0, settings['files-per-folder'], function (errCreateSamples) {
                    if (errCreateSamples) {
                        console.log('errCreateSamples = ', errCreateSamples);
                        return cbCreateFolder(errCreateSamples);
                    }
                    currentCount += 1;
                    if (currentCount < total) {
                        recurseCreateFolder(folderPath, filenamePrefix, level, currentCount, total, function (errRecurseCreateFolder) {
                            if (errRecurseCreateFolder) {
                                console.log('errRecurseCreateFolder = ', errRecurseCreateFolder);
                                return cbCreateFolder(errRecurseCreateFolder);
                            }
                            childHasChildren();
                        });
                    }
                    else {
                        childHasChildren();
                    }
                    function childHasChildren() {
                        // no sibling, should I have children?
                        level += 1;
                        if (level >= settings.levels) {
                            return cbCreateFolder(); // no more children
                        }
                        // recurseDown
                        recurseCreateFolder(newFolder, newFilenamePrevix, level, 0, total, cbCreateFolder);
                    }
                });
            }
            function recurseCreateSamples(outputPath, filenamePrefix, currentCount, total, cbCreateSamples) {
                var newPath = outputPath + '/' + filenamePrefix + '_';
                async.parallel({
                    pdf: function (cb) {
                        generator_1.default.createPDF(newPath + (currentCount + 1) + '.' + randomName(10) + '.pdf', cb);
                    },
                    docx: function (cb) {
                        generator_1.default.createPPTX(newPath + (currentCount + 2) + '.' + randomName(10) + '.pptx', cb);
                    },
                    pptx: function (cb) {
                        generator_1.default.createDOCX(newPath + (currentCount + 3) + '.' + randomName(10) + '.docx', cb);
                    }
                }, function (errParallel) {
                    if (errParallel) {
                        console.log('errParallel = ', errParallel);
                        cbCreateSamples(errParallel);
                    }
                    currentCount = currentCount + 3;
                    if (currentCount >= total) {
                        return cbCreateSamples();
                    }
                    recurseCreateSamples(outputPath, filenamePrefix, currentCount, total, cbCreateSamples);
                });
            }
        }]
}, function (errAuto, resultsAuto) {
    if (errAuto) {
        console.log('errAuto = ', errAuto);
        return;
    }
    console.log('resultsAuto = ', resultsAuto);
});
function randomName(size) {
    var text = '';
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ~'\"`";
    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
