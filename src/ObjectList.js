import React, { Component } from "react";
import NewObjectForm from './NewObjectForm';
import ObjectListItem from './ObjectListItem';
import { LoadingIcon } from '@pdyxs/re-decorate';
import { withRouter } from 'react-router-dom';

class ObjectList extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(object) {
    return (event) => {
      event.preventDefault();
      onRemove(object);
    }
  }

  render() {
    const {
      isParentSelected,
      onAdd,
      objects,
      parent,
      typeName,
      isRecursive,
      className,
      onEdit,
      onRemove,
      ...otherProps
    } = this.props;
    var ObjectComponent = this.props.ObjectComponent || ObjectListItem;
    var NewFormComponent = this.props.NewObjectForm || NewObjectForm;

    if (objects) {
      return (
        <ul className={'list-group ' + className + (parent == null ? '' : ' ml-4')}>
          {objects.map(o => (!isRecursive || (o.active && parent == o.parent)) && (
            <ObjectComponent key={o.id}
              typeName={typeName}
              objects={objects}
              item={o}
              onAdd={onAdd}
              isRecursive={isRecursive}
              NewObjectForm={this.props.NewObjectForm}
              onEdit={((!this.props.canEdit || this.props.canEdit(o)) ? onEdit : null )}
              onRemove={((!this.props.canRemove || this.props.canRemove(o)) ? onRemove : null )}
              {...otherProps}
              />
          ))}
          { (!isRecursive || parent == null || isParentSelected) &&
            <li
              className="list-group-item p-0 mr-0 rounded-0">
              <NewFormComponent
                onSubmit={onAdd} typeName={typeName}
                placeholder={'New ' + typeName + ' Name'} {...otherProps} />
            </li>
          }
        </ul>
      )
    }

    return (
      <LoadingIcon />
    )
  }

}

export default withRouter(ObjectList);
