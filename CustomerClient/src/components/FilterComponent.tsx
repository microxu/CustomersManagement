import React from 'react';
import { Badge, Button, FormControl, FormControlProps, InputGroup } from 'react-bootstrap';
import { Filter } from '../store';

interface Props {
  filters: Filter[];
  onAdd: (filter: Filter) => void;
  onRemove: (filter: Filter) => void;
}

interface State {
  input: string;
}

export class FilterComponent extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  public render() {
    return [
      <InputGroup key="input">
        <InputGroup.Prepend>
          <InputGroup.Text>Filter</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          minLength={50}
          placeholder="Type any text here or use smart filter (e.g. status:current), then hit Enter."
          value={this.state.input}
          onChange={this.handleTextChange}
          onKeyPress={this.handleKeyPress}
        />
      </InputGroup>,
      <div key="filters">
        {
          this.props.filters.map((f, i) =>
            (
              <Badge
                key={i}
                pill
                variant="warning"
                style={{ marginTop: 5, marginRight: 2, paddingLeft: 10, paddingRight: 10 }}
              >
                {f.key != null ? `${f.key}:${f.value}` : `${f.value}`}
                <Button variant="warning"
                  style={{ background: 'transparent', border: 0, padding: 0, marginLeft: 5 }}
                  onClick={this.handleRemove.bind(this, f)}>✖︎</Button>
              </Badge>
            )
          )
        }
      </div>
    ];
  }

  private handleTextChange = (e: React.FormEvent<FormControlProps>) => {
    const input = e.currentTarget.value || '';
    this.setState((s: State) => ({ ...s, input }));
  }

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const filter = this.makeFilter();
      if (filter != null) {
        this.props.onAdd(filter);
        this.setState((s: State) => ({ ...s, input: '' }));
      }
    }
  }

  private handleRemove = (filter: Filter) => {
    this.props.onRemove(filter);
  }

  private makeFilter(): Filter | undefined {
    const str = this.state.input.trim();
    const match = str.match(/(\w+)\s*:\s*(.+)/i);
    if (match !== null) {
      return { key: match[1], value: match[2] };
    }
    return { value: str };
  }
}
