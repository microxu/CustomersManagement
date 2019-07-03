import React from 'react';
import { Button, FormControl, FormControlProps, InputGroup, ListGroup } from 'react-bootstrap';
import { Note, NoteId } from '../api/model';

interface Props {
  note?: Note;
  onSubmit: (noteId: NoteId | undefined, content: string) => void;
  onCancel?: () => void;
}

interface State {
  content: string;
}

export class NoteEditor extends React.PureComponent<Props, State> {

  public constructor(props: Props) {
    super(props);
    this.state = {
      content: this.props.note != null ? this.props.note.note : ''
    };
  }

  public render() {
    return (
      <ListGroup.Item>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>{this.props.note == null ? 'Add Node' : 'Edit Node'}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Type note here"
            aria-label="Type note here"
            value={this.state.content}
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={this.handleSubmit}>Submit</Button>
            {
              this.props.onCancel != null &&
              <Button variant="outline-secondary" onClick={this.props.onCancel}>Cancel</Button>
            }
          </InputGroup.Append>
        </InputGroup>
      </ListGroup.Item>
    );
  }

  private handleTextChange = (e: React.FormEvent<FormControlProps>) => {
    const content = e.currentTarget.value || '';
    this.setState((s: State) => ({ ...s, content }));
  }

  private handleSubmit = () => {
    if (this.state.content.trim().length > 0) {
      const id = this.props.note != null ? this.props.note.id : undefined;
      this.props.onSubmit(id, this.state.content);
      this.setState((s: State) => ({ ...s, content: '' }));
      if (this.props.onCancel != null) {
        this.props.onCancel();
      }
    }
  }

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }
}
