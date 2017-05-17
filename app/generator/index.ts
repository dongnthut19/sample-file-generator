import pdfGenerator from './pdfGenerator';
import PPTXGenerator from './pptxGenerator';
import DOCXGenerator from './docxGenerator';

class Generator {
  public createPDF(filepath: string, cbCreate: any) {
    pdfGenerator.generate(filepath, cbCreate);
  }

  public createDOCX(filepath: string, cbCreate: any) {
    var docxGenerator = new DOCXGenerator();
    docxGenerator.generate(filepath, cbCreate);
  }

  public createPPTX(filepath: string, cbCreate: any) {
    var pptxGenerator = new PPTXGenerator();
    pptxGenerator.generate(filepath, cbCreate);
  }
}

export default new Generator();
