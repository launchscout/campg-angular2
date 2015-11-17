import {makeDecorator, makeParamDecorator, TypeDecorator} from 'angular2/src/core/util/decorators';

class DataMappingMetadata {
  constructor(options) {
    this.foo = options.foo;
  }
}

var DataMapping = makeDecorator(DataMappingMetadata);

export default DataMapping;
