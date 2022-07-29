import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import ComponentToPrint from './component-to-print.component';
import '../styles/style.scss';

class Printing extends React.PureComponent {
  render() {
    return (
      <div className='print-wrapper'>
        <a href="/dashboard" className="btn btn-primary btn-back"><span className="material-symbols-outlined">undo</span>Back</a>
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button type='button' className='btn btn-primary print-function-btn' onClick={handlePrint}><span className="material-symbols-outlined">print</span>Print/Download Document</button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Printing;