import { Injectable } from '@angular/core';
import createGraph, { Graph, Node } from 'ngraph.graph';
import { EventedType } from 'ngraph.events';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class GraphService {
  initCoord: number[] = [0, 0]; // number of vertices in graph
  ajdList: number[][];
  initNode = '0';

  maxLength = 0;

  ways: string[][];

  graph = createGraph();

  data: DataService;


  constructor() {
    this.buildGraph();
    this.ways = [];

   }
   init(graph: Graph<any, any> & EventedType) {
    this.graph = graph;
   }
   buildGraph() {

   }
   getPaths(coord: number[], maxLength: number) {
    // get initial node from initCoord
    this.initCoord = coord;
    this.maxLength = maxLength;
    const initArray: string[] = [this.initNode];
    this.getPathsRecursive('0', 0, initArray);

   }

   getPathsRecursive(node: string, currentLength: number, currentArray: string[]): boolean {
      if ((node === this.initNode && currentArray.length !== 1) || currentLength > this.maxLength / 2) {
        this.ways.push([...currentArray]);
        return true;
      }
      let linkedNodeId: string[] = [];
      let data: any;
      this.graph.forEachLinkedNode(node, function(linkedNode, link) {
        linkedNodeId.push(linkedNode.id.toString());
        data = link.data;
    }, false);

      // if (this.countOccurence(node, currentArray) >= 2) { return false; }
      // linkedNodeId = linkedNodeId.filter(x => !currentArray);//.filter(initial => initial !== this.initNode).includes(x));
      linkedNodeId = linkedNodeId.filter(x => !currentArray.includes(x)); // .filter(initial => initial !== this.initNode).includes(x));
      for (const nodeLink of linkedNodeId) {
        if (currentLength + Number(data.len) < this.maxLength) {
          currentArray.push(nodeLink);
          this.getPathsRecursive(nodeLink, +data.len + currentLength, currentArray );
          currentArray.pop();
        }
      }
      return false;

      // get adjacent nodes




   }

   countOccurence(el: string, array: string[]): number {
    let localCount: number;
    for (const i of array) {
      if (i === el) {
        localCount++;
      }
    }
    return localCount;
   }





}
