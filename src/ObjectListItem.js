import React, { Component } from "react";
import { LoadingIcon, DeleteButton } from '@pdyxs/re-decorate';
import ObjectList from './ObjectList';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EditableText } from 're-editable';

class ObjectListItem extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  handleAdd(objectName, parent = null) {
    this.props.onAdd(objectName, parent || this.props.item.id);
  }

  handleRemove() {
    this.props.onRemove(this.props.item);
  }

  onNameChange(name) {
    this.onEdit({name});
  }

  onEdit(changes) {
    this.props.onEdit(this.props.item, changes)
  }

  render() {
    const {
      item,
      isRecursive,
      url,
      className,
      SelectedItemComponent,
      ...otherProps
    } = this.props;

    let fullUrl = url + '/' + item.id;
    let isActive = this.context.router.route.location.pathname.startsWith(fullUrl);
    let activeClass = isActive ? ' list-group-item-action list-group-item-primary' : '';

    let RecursiveList = this.props.RecursiveList || ObjectList;

    if (item) {
      return (
        <li className={'list-group-item p-0 rounded-0 list-group-item-action ' + className + activeClass}>
          { isActive ?
            <div className="p-3 row d-flex justify-content-between align-items-center">
              <div className="col-md-12">
                { isRecursive && item.descendantCount &&
                  <span className="mr-2 badge badge-secondary badge-pill">
                    {item.descendantCount()}
                  </span>
                }
                <strong>
                  <EditableText value={item.name} onChange={this.onNameChange} canEdit={this.props.onEdit != null} />
                </strong>
                { SelectedItemComponent &&
                  <SelectedItemComponent item={item} {...otherProps} />
                }
              </div>
              <DeleteButton className="position-absolute mr-2" style={{right: '0'}} onDelete={this.handleRemove} url={url} />
            </div> :
            <Link
              to={fullUrl}
              className="p-3 d-flex align-items-center no-link-styling">
              { isRecursive && item.descendantCount &&
                <span className="mr-2 badge badge-secondary badge-pill">
                  {item.descendantCount()}
                </span>
              }
              {item.name}
            </Link>
          }

          { isRecursive &&
            <RecursiveList
              url={url}
              parent={item.id}
              onAdd={this.handleAdd}
              isParentSelected={isActive}
              isRecursive
              {...otherProps} />
          }
        </li>
      );
    }

    return (
      <LoadingIcon />
    );
  }
}

ObjectListItem.contextTypes = {
    router: PropTypes.object
};

export default withRouter(ObjectListItem);
