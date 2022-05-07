import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip, FormGroup, Switch, Paper } from '@mui/material';
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
    setOutputFormat,
    setFileName,
    setOutputName
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
    // display: 'flex',
    display: 'block',
    minWidth: '415px',
    maxWidth: '900px',
    
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

const OutPutFormatSelection = () => {
    const reducer = setOutputFormat;
    const value = useSelector((state) => state.settings.outputFormat);

    const dispatch = useDispatch();
    return Selection({
        value: value,
        onChange: x => dispatch(reducer(x)),

        legend: "Output Format",
        values: [{ "label": "M4b (fastest)", "value": "m4b" }, "flac", "mp3"]
    });
};

const OSSelection = () => {
    const dispatch = useDispatch();
    const reducer = setOperatingSystem;
    const value = useSelector((state) => state.settings.operatingSystem);

    return Selection({
        legend: "Operating System",
        values: [
            { "label": "Windows", "value": "win" },
            { "label": "Linux", "value": "linux" },
            { "label": "Mac", "value": "osx" }
        ],
        value: value, onChange: x => dispatch(reducer(x)),
    });
};

const NameSelection = () => {
    const dispatch = useDispatch();
    const reducer = setOutputName;
    const value = useSelector((state) => state.settings.outputName);

    return Selection({
        legend: "FileName",
        values: [
            { "label": "Preserve", "value": "keep" },
            { "label": "Metadata", "value": "meta" },
        ],
        value: value, onChange: x => dispatch(reducer(x))
    });
};


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
    return (<>
        <Tooltip title="Settings">
            <IconButton sx={{ ml: 1 }} onClick={ () => setOpen(true)}>
                <SettingsIcon fontSize="small" />
            </IconButton>
        </Tooltip>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box sx={modalStyle}>

                <OutPutFormatSelection />
                <OSSelection />
                <NameSelection />
                <QualitySelection />
            </Box>
        </Modal>
    </>);
};