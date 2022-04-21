import Excel from 'exceljs';
import fs from 'fs';
import path from 'path';
import { EXTENSION_FILE_CSV, EXTENSION_FILE_EXCEL, STATIC_PATH, STATIC_URL } from './Constant';
export const handleExportExcel = async (items, modelName) => {
  const workBook = new Excel.Workbook();
  const workSheet = workBook.addWorksheet(modelName);
  const optionCSV = {
    formatterOptions: {
      delimiter: '\t',
      quote: false,
    },
  };
  const { filePathExcel, filePathCSV, staticCSVFileUrl, staticExcelFileUrl } = setPath(modelName);
  workSheet.columns = setColumn(items[0]);
  workSheet.addRows(items);
  await workBook.xlsx.writeFile(filePathExcel);
  await workBook.csv.writeFile(filePathCSV, optionCSV);
  const buffer = await workBook.csv.writeBuffer();
  const blob = buffer.toString('base64');
  return { staticCSVFileUrl, staticExcelFileUrl, blob };
};

const setPath = modelName => {
  const fileNameExcel = `${modelName}_${Date.now()}.${EXTENSION_FILE_EXCEL}`;
  const fileNameCSV = `${modelName}_${Date.now()}.${EXTENSION_FILE_CSV}`;
  const directory = path.join(__dirname, `${STATIC_PATH}/${modelName}`);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return {
    filePathExcel: `${directory}/${fileNameExcel}`,
    filePathCSV: `${directory}/${fileNameCSV}`,
    staticExcelFileUrl: `${STATIC_URL}/${modelName}/${fileNameExcel}`,
    staticCSVFileUrl: `${STATIC_URL}/${modelName}/${fileNameCSV}`,
  };
};

const setColumn = obj => {
  const column = [];
  for (const key in obj) {
    column.push({
      header: key,
      key: key,
    });
  }
  return column;
};
