import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './FilesPage.css';


import { fileService, authenticationService } from '@/_services';
import { timer } from 'rxjs';

class FilesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previous: false,
            next: false,
            currentPage: 1,
            currentUser: authenticationService.currentUserValue,
            files: {"results": [
            ],
            file_group_search: null,
            file_type_search: null,
            metadata_search: null,
            file_name_search: null,
            file_name_regex_search: null
        }};
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.fileDetails = this.fileDetails.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.updateFileGroupSearch = this.updateFileGroupSearch.bind(this);
        this.updateFileTypeSearch = this.updateFileTypeSearch.bind(this);
        this.updateMetadataSearch = this.updateMetadataSearch.bind(this);
        this.updateFileNameSearch = this.updateFileNameSearch.bind(this);
        this.updateFileNameRegexSearch = this.updateFileNameRegexSearch.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage() {
        fileService.getPageSearch(this.state.currentPage, this.state.file_group_search, this.state.file_type_search, this.state.metadata_search, this.state.file_name_search, this.state.file_name_regex_search).then(files => this.setState({ files }));
    }

    nextPage(event) {
        this.state.currentPage = this.state.currentPage + 1;
        this.loadPage()
    }

    previousPage(event) {
        this.state.currentPage = this.state.currentPage - 1;
        this.loadPage()
    }

    fileDetails(event) {
        this.props.history.push("/file/" + event)
    }

    updateFileGroupSearch(event) {
        this.setState({file_group_search: event.target.value})
    }

    updateFileTypeSearch(event) {
        this.setState({file_type_search: event.target.value})
    }

    updateMetadataSearch(event) {
        this.setState({metadata_search: event.target.value})
    }

    updateFileNameSearch(event) {
        this.setState({file_name_search: event.target.value})
    }

    updateFileNameRegexSearch(event) {
        this.setState({file_name_regex_search: event.target.value})
    }

    search(event) {
        this.state.currentPage = 1;
        this.loadPage();
        this.setState({
            file_group_search: '', 
            file_type_search: '',
            metadata_search: '',
            file_name_search: '',
            file_name_regex_search: ''
        })
    }

    render() {
        const { previous, next, currentPage, currentUser, files, file_group_search, file_type_search, metadata_search, file_name_search, file_name_regex_search } = this.state;
        return (
            <div>
                 Search:<br/>
                 <TextField
                    id="outlined-disabled"
                    label="File Group"
                    value={file_group_search}
                    style = {{width: 400}}
                    onChange={this.updateFileGroupSearch}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-disabled"
                    label="File Type"
                    value={file_type_search}
                    onChange={this.updateFileTypeSearch}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-disabled"
                    label="Metadata: KEY:VALUE_REGEX"
                    value={metadata_search}
                    style = {{width: 400}}
                    onChange={this.updateMetadataSearch}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-disabled"
                    label="File Name"
                    value={file_name_search}
                    onChange={this.updateFileNameSearch}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-disabled"
                    label="File Name (Regex)"
                    value={file_name_regex_search}
                    onChange={this.updateFileNameRegexSearch}
                    margin="normal"
                    variant="outlined"
                />
                <br/>
                <Button onClick={this.search}>Search</Button>
                <Paper className="root">
                <Table className="table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Files</TableCell>
                        <TableCell align="left">File size</TableCell>
                        <TableCell align="left">Sample Id</TableCell>
                        <TableCell align="left">Request Id</TableCell>
                        <TableCell align="left">File group name</TableCell>
                        <TableCell align="left">Details</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.results.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.file_name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.size}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.sample_id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.request_id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.file_group}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <Button variant="contained" onClick={() => this.fileDetails(row.id)}>
                                    Details
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell>
                        <Button align="left" variant="contained" disabled={files.previous == null} onClick={this.previousPage}>
                            Previous
                        </Button>
                        </TableCell>
                        <TableCell align="center">
                            Page: {this.state.currentPage}
                        </TableCell>
                        <TableCell>
                        </TableCell>
                        <TableCell align="right">
                        <Button variant="contained" disabled={files.next == null} onClick={this.nextPage}>
                            Next
                        </Button>
                        </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                </Paper>
            </div>
        );
    }
}

export { FilesPage };
