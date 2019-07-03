import React from 'react';
import { Dropdown, DropdownButton, InputGroup, InputGroupProps, ListGroup } from 'react-bootstrap';
import { DropdownItemProps } from 'react-bootstrap/DropdownItem';
import { connect } from 'react-redux';
import { addNote, fetchNotes, updateCustomer, updateNote } from '../actions/commands';
import { Customer, CustomerId, CustomerStatus, Note, NoteId } from '../api/model';
import { selectNotes } from '../selectors/customers';
import { AppState } from '../store';
import { NoteEditor } from './NoteEditor';
import { exportDefaultSpecifier } from '@babel/types';

interface OwnProps {
  customer: Customer;
  editMode: boolean;
  onRowClick: (customerId: CustomerId) => void;
}

interface StateProps {
  notes: Note[];
}

interface DispatchProps {
  fetchNotes: typeof fetchNotes;
  addNote: typeof addNote;
  updateNote: typeof updateNote;
  updateCustomer: typeof updateCustomer;
}

type Props = OwnProps & StateProps & DispatchProps;
interface State {
  editNodeId: NoteId | undefined;
}

interface Snapshot {
  editModeEntered: boolean;
}

class CustomerRowInner extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      editNodeId: undefined
    };
  }

  public getSnapshotBeforeUpdate(prevProps: Props, _: State): Snapshot {
    return {
      editModeEntered: this.props.editMode === true && prevProps.editMode !== true
    };
  }

  public componentDidUpdate(_: Props, _2: State, snapshot: Snapshot): void {
    if (snapshot.editModeEntered) {
      this.props.fetchNotes(this.props.customer.id);
    }
  }

  public render() {
    const { id, userName, gender, age, phoneNumber, createDate } = this.props.customer;
    const elements = [
      <tr key="header" style={{ cursor: 'pointer' }} onClick={this.handleRowClick} >
        <td>{id}</td>
        <td>{userName}</td>
        <td>{this.renderStatus()}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{phoneNumber}</td>
        <td>{createDate}</td>
      </tr>
    ];
    if (this.props.editMode) {
      elements.push(<tr key="hidden" hidden />); // this is to skip strip
      elements.push(this.renderEditor());
    }
    return elements;
  }

  private renderStatus = () => {
    if (this.props.editMode) {
      return (
        <InputGroup>
          <DropdownButton
            variant="outline-secondary"
            id="userStatus"
            title={this.props.customer.userStatus}
            onClick={this.handleStatusClick}
          >
            <Dropdown.Item onClick={this.handleStatusChange}>prospective</Dropdown.Item>
            <Dropdown.Item onClick={this.handleStatusChange}>current</Dropdown.Item>
            <Dropdown.Item onClick={this.handleStatusChange}>non-active</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      );
    }

    return (
      <span>{this.props.customer.userStatus}</span>
    );
  }

  private handleStatusChange = (e: React.SyntheticEvent<DropdownItemProps<string>>) => {
    const status = (e.target as HTMLAnchorElement).innerText as CustomerStatus;
    this.props.updateCustomer({ ...this.props.customer, userStatus: status });
  }

  private handleStatusClick = (e: React.FormEvent<InputGroupProps>) => {
    e.stopPropagation();
  }

  private handleRowClick = () => {
    this.props.onRowClick(this.props.customer.id);
  }

  private startEditNote = (noteId: NoteId | undefined) => {
    const currentId = this.state.editNodeId;
    if (currentId !== noteId) {
      this.setState((s: State) => ({ ...s, editNodeId: noteId }));
    }
  }

  private cancelEditNote = () => {
    this.setState((s: State) => ({ ...s, editNodeId: undefined }));
  }

  private handleSubmit = (noteId: NoteId | undefined, note: string) => {
    if (noteId == null) {
      this.props.addNote({ customerId: this.props.customer.id, note });
    } else {
      this.props.updateNote({ id: noteId, userId: this.props.customer.id, note });
    }
  }

  private renderEditor = () => {
    return (
      <tr key="editor" style={{ background: '#fff' }}>
        <td />
        <td colSpan={6}>
          <ListGroup>
            {
              this.props.notes.map(i => {
                if (i.id === this.state.editNodeId) {
                  return (
                    <NoteEditor
                      key={i.id}
                      note={i}
                      onSubmit={this.handleSubmit}
                      onCancel={this.cancelEditNote} />
                  );
                } else {
                  const onClick = () => this.startEditNote(i.id);
                  return (
                    <ListGroup.Item key={i.id} style={{ cursor: 'pointer' }} onClick={onClick}>
                      {i.note}
                    </ListGroup.Item>
                  );
                }

              })
            }
            {
              (() => {
                if (this.state.editNodeId == null) {
                  return (<NoteEditor onSubmit={this.handleSubmit} />);
                }
              })
/*
              this.state.editNodeId == null &&
              <NoteEditor onSubmit={this.handleSubmit} />*/
            }
          </ListGroup>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  return {
    notes: selectNotes(state, ownProps.customer.id)
  };
};

export const CustomerRow = connect(
  mapStateToProps, {
    fetchNotes,
    addNote,
    updateNote,
    updateCustomer
  },
)(CustomerRowInner);
