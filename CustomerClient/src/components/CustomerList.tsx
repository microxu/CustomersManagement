import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCustomers } from '../actions/commands';
import { addFilter, removeFilter } from '../actions/filters';
import { updateSorting } from '../actions/sorting';
import { Customer, CustomerId } from '../api/model';
import { selectCustomers } from '../selectors/customers';
import { AppState, Filter, Sorting } from '../store';
import { CustomerRow } from './CustomerRow';
import { FilterComponent } from './FilterComponent';

interface OwnProps { }

interface StateProps {
  customers: Customer[];
  sorting: Sorting;
  filters: Filter[];
}

interface DispatchProps {
  fetchCustomers: typeof fetchCustomers;
  updateSorting: typeof updateSorting;
  addFilter: typeof addFilter;
  removeFilter: typeof removeFilter;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  editId: CustomerId | undefined;
}

class CustomerListInner extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      editId: undefined
    };
  }

  public componentDidMount(): void {
    if (this.props.customers.length === 0) {
      this.props.fetchCustomers(undefined);
    }
  }

  public render() {

    return (
      <div>
        <div style={{ padding: 5 }}>
          <FilterComponent
            filters={this.props.filters}
            onAdd={this.props.addFilter}
            onRemove={this.props.removeFilter} />
        </div>
        <Table striped bordered hover>
          <thead>
            {/* TODO: improve this by using Array.map() */}
            <tr style={{ cursor: 'pointer' }}>
              <th onClick={this.handleHeaderClick.bind(this, 'id')}>
                Id {this.sortArrow('id')}
              </th>
              <th onClick={this.handleHeaderClick.bind(this, 'userName')}>
                Name {this.sortArrow('userName')}
              </th>
              <th onClick={this.handleHeaderClick.bind(this, 'userStatus')}>
                Status {this.sortArrow('userStatus')}
              </th>
              <th onClick={this.handleHeaderClick.bind(this, 'gender')}>
                Gender {this.sortArrow('gender')}
              </th>
              <th onClick={this.handleHeaderClick.bind(this, 'age')}>
                Age {this.sortArrow('age')}
              </th>
              <th onClick={this.handleHeaderClick.bind(this, 'phoneNumber')}>
                Phone Number {this.sortArrow('phoneNumber')}
              </th>
              <th onClick={this.handleHeaderClick.bind(this, 'createDate')}>
                Created {this.sortArrow('createDate')}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.customers.map(c => {
                const editable = this.state.editId === c.id;
                return (
                  <CustomerRow key={c.id} customer={c} editMode={editable} onRowClick={this.handleRowChange} />
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }

  private sortArrow = (key: string): string | undefined => {
    if (this.props.sorting.key === key) {
      return this.props.sorting.ascending ? '↑' : '↓';
    }
    return undefined;
  }

  private handleHeaderClick = (key: string): void => {
    if (this.props.sorting.key === key) {
      this.props.updateSorting({ key, ascending: !this.props.sorting.ascending });
    } else {
      this.props.updateSorting({ key, ascending: this.props.sorting.ascending });
    }
  }

  private handleRowChange = (customerId: CustomerId) => {
    const currentId = this.state.editId;
    if (customerId === currentId) {
      this.setState((s: State) => ({ ...s, editId: undefined }));
    } else {
      this.setState((s: State) => ({ ...s, editId: customerId }));
    }
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    customers: selectCustomers(state),
    sorting: state.sorting,
    filters: state.filters
  };
};

export const CustomerList = connect(
  mapStateToProps, {
    fetchCustomers,
    updateSorting,
    addFilter,
    removeFilter
  },
)(CustomerListInner);
