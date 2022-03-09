import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RestService } from '../../core/services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class TablasService {

  es: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };

  constructor(private restService: RestService) {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

  }

 
  // EXPORTAR TABLA EN FORMATO EXCEL

  exportarExcel(datos: any[], nombre: string) {
    import("xlsx").then(xlsx => {
      //const header = headerExcel;
      const header = Object.keys(datos[0]);
      var wscols = [];
      for (var i = 0; i < header.length; i++) {
        wscols.push({ wch: 20 })  
        // Tamaño de las columnas 20
      }
      const worksheet = xlsx.utils.json_to_sheet(datos);
      worksheet["!cols"] = wscols;
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });

      let hoy = new Date();
      nombre = nombre + '_' + hoy.toLocaleDateString() + '_' + hoy.toLocaleTimeString();
      this.saveAsExcelFile(excelBuffer, nombre);
      
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }

 // EXPORTAR TABLA EN FORMATO CSV

 /**
   * Creates an array of data to CSV. It will automatically generate a title row based on object keys.
   *
   *  rows array of data to be converted to CSV.
   *  fileName filename to save as.
   *  columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
   */
  public exportarCSV(datos: any[], fileName: string, columns?: string[]): string {
    if (!datos || !datos.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(datos[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } 
      else {
        return true;
      }
    });
    const csvContent =
      keys.join(separator) +
      '\n' +
      datos.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    this.saveAsCsvFile(csvContent, fileName);
  }

  /**
   * Saves the file on the client's machine via FileSaver library.
   *
   * buffer The data that need to be saved.
   * fileName File name to save as.
   * fileType File type to save as.
   */
   saveAsCsvFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let CSV_TYPE = 'text/csv;charset=utf-8;';
      let CSV_EXTENSION = ".csv";
      const data: Blob = new Blob([buffer], {type: CSV_TYPE});
      let hoy = new Date();
      fileName = fileName + '_' + hoy.toLocaleDateString() + '_' + hoy.toLocaleTimeString();
      FileSaver.saveAs(data, fileName + CSV_EXTENSION);
    });
  }
}
