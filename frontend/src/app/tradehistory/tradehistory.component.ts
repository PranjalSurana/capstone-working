import { Component } from '@angular/core';
import { Transaction } from '../models/Transaction';
import { BuynsellService } from '../services/buynsell.service';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css'],
})
export class TradehistoryComponent {
  transactions: Transaction[] = [];

  constructor(private buynsellService: BuynsellService) {}

  ngOnInit(): void {
    this.buynsellService.getTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /*generateBuyReportCsv() {
    const headers = [
      'Execution Price',
      'Name',
      'Sector',
      'Quantity',
      'Transaction Date',
    ];
    console.log(this.transactions);
    const transactionReportData = [...this.transactions]; // Replace with your actual Buy Report data

    // Create the CSV content, including headers
    let csvContent = headers.join(',') + '\n';
    console.log(transactionReportData);
    // Add data rows to the CSV content
    for (let i = 0; i < transactionReportData.length; i++) {
      const rowData = [
        transactionReportData[i].buySellPrice,
        transactionReportData[i].instrument.instrumentDescription,
        transactionReportData[i].instrument.categoryId,
        transactionReportData[i].quantity,
        transactionReportData[i].transactionDate,
      ];
      csvContent += rowData.join(',') + '\n';
    }

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Trigger the download
    saveAs(blob, 'buy_report.csv');
  }*/

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
