import React, { Component } from 'react';
<<<<<<< HEAD
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
=======
import { Table, TableData } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import { DataManipulator } from './DataManipulator';
import './Graph.css';

>>>>>>> task3-branch
interface IProps {
  data: ServerRespond[],
}

<<<<<<< HEAD
/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
//extending the HTMLElement class from the PerspectiveViewerElement interface
interface PerspectiveViewerElement extends HTMLElement{
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  // Perspective table
=======
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}
class Graph extends Component<IProps, {}> {
>>>>>>> task3-branch
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
<<<<<<< HEAD
    // Get element to attach the table from the DOM.
    //updated assignment of const elem as the HTMLElement class is extended.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
=======
    // Get element from the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    const schema = {
      //updated schema object with relevant attributes.
      price_abc:'float',
      price_def:'float',
      ratio:'float',
      trigger_alert:'float',
      upper_bound: 'float',
      lower_bound: 'float',
>>>>>>> task3-branch
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
<<<<<<< HEAD
      console.log('change table');
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      // Add more Perspective configurations here.
      elem.load(this.table);
      elem.setAttribute('view','y_line');
      elem.setAttribute('column-pivots','["stock"]');
      elem.setAttribute('row-pivots','["timestamp"]');
      elem.setAttribute('columns','["top_ask_price"]');
      elem.setAttribute('aggregates','{"stock":"distinct count","top_ask_price":"avg","top_bid_price":"avg","timestamp":"distinct count"}');
=======
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      elem.load(this.table);
      elem.setAttribute('view', 'y_line');
      elem.setAttribute('row-pivots', '["timestamp"]');
      elem.setAttribute('columns', '["ratio","lower_bound","upper_bound","trigger_alert"]');
      elem.setAttribute('aggregates', JSON.stringify({
        //modified attributes according to the change in the schema.
        price_abc:'avg',
        price_def:'avg',
        ratio:'avg',
        trigger_alert:'avg',
        upper_bound: 'avg',
        lower_bound: 'avg',
        timestamp: 'distinct count',
      }));
>>>>>>> task3-branch
    }
  }

  componentDidUpdate() {
<<<<<<< HEAD
    // Everytime the data props is updated, insert the data into Perspective table
    if (this.table) {
      // As part of the task, you need to fix the way we update the data props to
      // avoid inserting duplicated entries into Perspective table again.
      this.table.update(this.props.data.map((el: any) => {
        // Format the data from ServerRespond to the schema
        return {
          stock: el.stock,
          top_ask_price: el.top_ask && el.top_ask.price || 0,
          top_bid_price: el.top_bid && el.top_bid.price || 0,
          timestamp: el.timestamp,
        };
      }));
=======
    if (this.table) {
      //Changes made to tabledata.
      this.table.update([
        DataManipulator.generateRow(this.props.data),
      ]as unknown as TableData);
>>>>>>> task3-branch
    }
  }
}

export default Graph;
