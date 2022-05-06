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
import { useSelector, useDispatch } from 'react-redux'
import {
setQuality,
enableEncode,
setOperatingSystem,
setOutputFormat
} from 'src/features/settings/settingsSlice';

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
    legend: "Operating System",
    value,
    onChange
});


const QualitySelection = () => {
    const dispatch = useDispatch();
    const quality = useSelector((state) => state.settings.quality);
    const encodeEnabled = useSelector((state) => state.settings.encodeEnabled);

    return <Box style={{ display: 'flex' }}>
        <FormGroup>
            <FormControlLabel
                label="Encode (Slow)"
                style={{ whiteSpace: 'nowrap' }}
                control={
                    <Switch
                        checked={encodeEnabled}
                        onChange={(x, y) => dispatch(enableEncode(y))} />
                }
            />
        </FormGroup>
        <Slider
            value={quality}
            onChange={(x, y) => dispatch(setQuality(y))}
            aria-labelledby="input-slider"
            disabled={!encodeEnabled}
            min={64}
            max={320} />
        <Typography sx={{ paddingLeft: '10px' }}>{quality}kbps</Typography>
    </Box>;
}


export const SettingsModal = (props) => {
    

    const [open, setOpen] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const dispatch = useDispatch();
    const operatingSystem = useSelector((state) => state.settings.operatingSystem);
    const outputFormat = useSelector((state) => state.settings.outputFormat);

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
                    value={currentTab}
                    onChange={(event, newValue) => setCurrentTab(newValue)}
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
                <TabPanel value={currentTab} index={0}>
                    <OutPutFormatSelection value={outputFormat} onChange={x => dispatch(setOutputFormat(x))} />
                    <OSSelection value={operatingSystem} onChange={x => dispatch(setOperatingSystem(x))} />
                    <QualitySelection />

                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={currentTab} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={currentTab} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={currentTab} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={currentTab} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={currentTab} index={6}>
                    Item Seven
                </TabPanel>
            </Box>
        </Modal>
    </>);
};