  // jshint ignore: start
(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'pdfproject',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';
    vm.toJsPDF = toJsPDF;
    vm.toPDFMake = toPDFMake;
    vm.tohtml2 = tohtml2;
    vm.otro = otro;
    vm.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    vm.series = ['Series A', 'Series B'];
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    vm.onClick = function (points, evt) {
      console.log(points, evt);
    };
    vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    vm.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    activate();

    function activate() {
      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });
    }

    function toJsPDF() {
      // var imgWidth = 210;
      // var pageHeight = 295;
      // var imgHeight = canvas.height * imgWidth / canvas.width;
      // var heightLeft = imgHeight;

      // //enter code here

      // var doc = new jsPDF('p', 'mm');
      // var position = 0;

      // doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      // heightLeft -= pageHeight;

      // while (heightLeft >= 0) {
      // position = heightLeft - imgHeight;
      // doc.addPage();
      // doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      // heightLeft -= pageHeight;
      // }
      // doc.save( 'file.pdf');

      /*var specialElementHandlers = {
        '#bypassme': function(element, renderer) {
          return true;
        }
      };
      var doc = new jsPDF();
      var elemento = document.getElementById('dashboard-view').innerHTML;
      doc.fromHTML(elemento, 15, 15, {
        'width': 100, // max width of content on PDF
        'elementHandlers': specialElementHandlers
      });
      doc.save('file.pdf');*/

      var pdf = new jsPDF('p','pt', 'a4');
      var pdfConf = {
        /*width: 600,
        height: 2000,*/
        pagesplit: true,
        background: '#fff'
      };
      pdf.addHTML(document.getElementById('dashboard-view'), 0, 0, pdfConf,function() {
        var string = pdf.output('datauristring');
        pdf.save('web.pdf');
      });
    }

    function toPDFMake() {
      var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
      pdfMake.createPdf(docDefinition).open();
    }

    function otro() {
      var html = document.getElementById('dashboard-view').innerHTML;

      rasterizeHTML.drawHTML(html).then(function (renderResult) {
        context.drawImage(renderResult.image, 10, 25);
      });
    }

    function tohtml2() {
      var element = document.getElementById('dashboard-view');
      html2pdf(element);
    }
  } })();
