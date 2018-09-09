import React, { Component } from "react";
import ObjectList from './ObjectList';
import ReactMarkdown from 'react-markdown';
import { Switch, Route, withRouter } from 'react-router-dom';
import { LoadingIcon } from '@pdyxs/re-decorate';
import NewObjectForm from './NewObjectForm';

class ObjectPage extends Component {
  constructor() {
    super();
    this.deleteSelected = this.deleteSelected.bind(this);
    this.moveToObject = this.moveToObject.bind(this);
  }

  deleteSelected() {
    this.props.onRemove(this.props.selected);
  }

  moveToObject(e) {
    this.props.history.push(`${this.props.url}/${e.target.value}`);
  }

  render() {
    const {
      objects,
      selected,
      instructions,
      PageComponent,
      typeName,
      objectName,
      onEdit,
      url,
      className,
      PageRouter,
      ...otherProps
    } = this.props;

    if (objects == null) {
      return (
        <LoadingIcon />
      )
    }
    let routeUrl = this.props.routeUrl || url;
    var NewFormComponent = this.props.NewObjectForm || NewObjectForm;

    return (
      <div className={className + " row"}>
        <div className="col-md-4 p-0">
          <ObjectList
            className="d-none d-md-block"
            objects={objects}
            url={url}
            routeUrl={routeUrl}
            typeName={typeName}
            objectName={objectName}
            onEdit={onEdit}
            {...otherProps}
            />
          <div className="d-block d-md-none">
            <select onChange={this.moveToObject}
              value={this.props.match.params[`${typeName}id`] || ''}
              className="custom-select">
              <option value="" disabled>Choose a {objectName}</option>
              { objects.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
            <NewFormComponent
              onSubmit={this.props.onAdd} typeName={typeName}
              placeholder={'New ' + typeName + ' Name'} {...otherProps} />
          </div>
        </div>
        <div className="col-md-8 border bg-white p-3">
          <Route path={routeUrl} exact component={ReactMarkdown} source={instructions} />
          <Route path={routeUrl + '/:' + (objectName || typeName.toLowerCase()) + 'id'} component={PageComponent} onEdit={onEdit} />
        </div>
      </div>
    )
  }
}

export default withRouter(ObjectPage);
