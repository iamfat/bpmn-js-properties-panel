'use strict';


var inherits = require('inherits');

var PropertiesActivator = require('../../PropertiesActivator');

var serviceTaskDelegateProps = require('./parts/ServiceTaskDelegateProps'),
    userTaskProps = require('./parts/UserTaskProps'),
    flowNodeProps = require('./parts/FlowNodeProps'),
    processProps = require('./parts/ProcessProps'),
    eventProps = require('./parts/EventProps'),
    linkProps = require('./parts/LinkProps'),
    callActivityProps = require('./parts/CallActivityProps'),
    documentationProps = require('./parts/DocumentationProps'),
    multiInstanceProps = require('./parts/MultiInstanceLoopProps');

function DefaultPropertiesProvider(eventBus, bpmnFactory) {

  PropertiesActivator.call(this, eventBus);

  this.getGroups = function(element) {

    var generalGroup = {
      id: 'General',
      entries: []
    };
    processProps(generalGroup, element);
    serviceTaskDelegateProps(generalGroup, element);
    documentationProps(generalGroup, element);
    multiInstanceProps(generalGroup, element, bpmnFactory);

    var userTaskGroup = {
      id : 'userTaskGroup',
      entries : []
    };

    userTaskProps(userTaskGroup, element);

    var flowNodeGroup = {
      id : 'flowNodeGroup',
      entries : []
    };
    flowNodeProps(flowNodeGroup, element);
    eventProps(flowNodeGroup, element);
    linkProps(flowNodeGroup, element);
    callActivityProps(flowNodeGroup, element);


    return[
      generalGroup,
      userTaskGroup,
      flowNodeGroup
    ];
  };
}

inherits(DefaultPropertiesProvider, PropertiesActivator);

module.exports = DefaultPropertiesProvider;