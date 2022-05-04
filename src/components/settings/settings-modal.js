import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip, FormGroup, Switch } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import * as React from 'react';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Slider from '@mui/material/Slider';
import { Label } from '@mui/icons-material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            
        >
            {value === index && (
                <Box sx={{ p: 3 }} >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Selection = ({ values, legend, value, onChange }) => {
    const controls = values.map((v, i) => <FormControlLabel key={i} value={v.value ?? v} control={<Radio />} label={v.label ?? v} />);

    return (<FormControl component="fieldset" style={{ padding: '15px' }} >
        <FormLabel component="legend">{legend}</FormLabel>
        <RadioGroup aria-label="format" name="format" value={value} onChange={(x, y) => onChange(y)}>
            {controls}
        </RadioGroup>
    </FormControl>);
};

const OutPutFormatSelection = ({ value, onChange }) => Selection({
    values: [{ "label": "M4b (fastest)", "value": "m4b" }, "flac", "mp3"],
    legend: "Output Format",
    value,
    onChange
});

const OSSelection = ({ value, onChange }) => Selection({
    values: [
        { "label": "Windows", "value": "win" },
        { "label": "Linux", "value": "linux" },
        { "label": "Mac", "value": "osx" }
    ],
    legend: "Output Format",
    value,
    onChange
});


export const SettingsModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    const [outputFormat, setOutputFormat] = React.useState('m4b');
    const [operatingSystem, setOperatingSystem] = React.useState('win');
    const [encodeEnabled, setEncodeEnabled] = React.useState(false);

    const [quality, setQuality] = React.useState(320);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (<>
        <Tooltip title="Settings">
            <IconButton sx={{ ml: 1 }} onClick={handleOpen}>
                <SettingsIcon fontSize="small" />
            </IconButton>
        </Tooltip>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    onChange={(event, newValue) => setTabValue(newValue)}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Quality" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <OutPutFormatSelection value={outputFormat} onChange={setOutputFormat} />
                    <OSSelection value={operatingSystem} onChange={setOperatingSystem} />
                    <Box style={{display: 'flex'}}>
                        <FormGroup>
                            <FormControlLabel control={<Switch value={encodeEnabled} onChange={(x, y) => setEncodeEnabled(y)} />} label="Encode (Slow)" />
                        </FormGroup>
                        <Slider
                            value={quality}
                            onChange={(x, y) => setQuality(y)}
                            aria-labelledby="input-slider"
                            disabled={!encodeEnabled}
                            min={64}
                            max={320}
                        />
                        <Typography sx={{paddingLeft:'10px'}}>{quality}</Typography>
                    </Box>

                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                    Item Seven
                </TabPanel>
            </Box>
        </Modal>
    </>);
};