import {useState, useEffect, cloneElement, forwardRef, useRef } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { experimentalStyled as styled } from '@mui/material/styles'
import { useParams } from 'react-router';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Stack from '@mui/material/Stack';
import CheckboxButton from './CheckboxButton';
import theme from './theme';
import Slider from '@mui/material/Slider';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';

import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SplitPane from 'react-split-pane';
import ViewerWithUI from "./ViewerWithUI";
import ViewerDxf from './ViewerDxf';
import MobileViewerWithUI from './MobileViewerWithUI';
import MobileViewerDxf from './MobileViewerDxf';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Choose = (props) => {
  const navigator = useNavigate();
  const location = useLocation();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const params = useParams();
  const [data, setData] = useState(null);
  const [dispdata, setDispData] = useState(null);
  // const splitPnlRef = useRef(null);
  // const [splitPnl1stwidth, setsplitPnl1stwidth] = useState(0);

  const drawerWidth = 240;
  // const [chks, setChks] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));

  const [controled, setControled] = useState(false);
  const [brakable, setBrakable] = useState(false);
  const [geared, setGeared] = useState(false);
  const [hollow, setHollow] = useState(false);
  const [voltage12, setVoltage12] = useState(false);
  const [voltage24, setVoltage24] = useState(false);
  const [voltage36, setVoltage36] = useState(false);
  const [voltage48, setVoltage48] = useState(false);
  const [encorder, setEncorder] = useState(false);
  const [commrs485, setCommrs485] = useState(false);
  const [commethercat, setCommethercat] = useState(false);

  const [torques, setTorques] = useState([]);
  const [displaytorques, setDisplaytorques] = useState([]);
  const [slidTorque, setSlidTorque] = useState(0);
  const [speeds, setSpeeds] = useState([]);
  const [displayspeeds, setDisplayspeeds] = useState([]);
  const [slidSpeed, setSlidspeed] = useState(0);
  const [sizes, setSizes] = useState([]);

  const [qrySizes, setQrySizes] = useState(['']);
  const [qryTorques, setQryTorques] = useState(['']);
  const [qrySpeeds, setQrySpeeds] = useState(['']);

  const [disableRs485, setDisableRS485] = useState(false);
  const [disableEthercat, setDisableEthercat] = useState(false);
  const [disableControl, setDisableControl] = useState(false);
  const [disablehollow, setdisableHollow] = useState(false);
  const [disableencorder, setdisableEncorder] = useState(false);
  const [disablegeared, setdisableGeared] = useState(false);
  const [disablebrakable, setdisableBrakable] = useState(false);
  const [minSpeed, setMinspeed] = useState(0);
  const [maxSpeed, setMaxspeed] = useState(0);
  const [stepUrl, setStepUrl] = useState('');
  const [dxfUrl, setDxfUrl] = useState('');
  const [stlUrl, setStlUrl] = useState('');

  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState('xl');
  const [allowResize, setallowResize] = useState(false);

  const [dialogName, setDialogName] = useState('');
  const [dialogbuyurl, setDialogBuyurl] = useState('');

  const handleClickOpen = (arg, dxf, buy, name, stl) => {
    console.log(arg, dxf, buy, name);

    setStepUrl(arg);
    setDxfUrl(dxf);
    setDialogBuyurl(buy);
    setDialogName(name);
    setStlUrl(stl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setallowResize(false);
  };

  const onLoaded =() => {
    console.log(' ============================== lalkdsfjlasdkjflasdkj');
    setallowResize(true);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));
  
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'left',
    marginLeft: '15px',
    color: theme.palette.text.secondary,
  }));
  
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      }),
      position: 'relative',
      [theme.breakpoints.up('lg')]: {
        ...(open && {
          marginRight: `max(0px, calc(240px - calc(calc(100vw - 1200px) / 1.8)));`,
        }),
      },    
  
    }),
  );
  
  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    }
  };

  const findUniqueValuesForProperty = (data, propertyName) => {
    const valuesSet = new Set();
  
    function searchProperty(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(item => searchProperty(item));
      } else if (typeof obj === 'object' && obj !== null) {
        if (obj.hasOwnProperty(propertyName)) {
          if (Array.isArray(obj[propertyName])) {
            obj[propertyName].forEach(item => valuesSet.add(item))
          } else 
            valuesSet.add(obj[propertyName]);
        }
        Object.values(obj).forEach(value => {
          if (typeof value === 'object') {
            searchProperty(value);
          }
        });
      }
    }
  
    searchProperty(data);
    return Array.from(valuesSet).sort((a, b) => a - b);  // 또는 [...valuesSet] 사용
  }

  const getSpeedsForVoltage = (products, volt) => {
    return products.map(product => {
      const specForVoltage = product.specs.find(spec => spec.voltage === volt);
      return specForVoltage ? specForVoltage.speed : null;
    }).filter(speed => speed !== null); // null 값 제거
  }
  

  const checkFilterdisable = (array) => {
    const tmp485 = findUniqueValuesForProperty(array, 'communication');
    const is485 = !tmp485.some(itm => itm === 'rs485');
    const isethercat = !tmp485.some(itm => itm === 'ethercat');
    setDisableRS485(is485);
    setDisableEthercat(isethercat);
    is485 && setCommrs485(false);
    isethercat && setCommethercat(false);

    const tmpcontroled = findUniqueValuesForProperty(array, 'controled');
    const iscontrol = !tmpcontroled.some(itm => itm === true);
    setDisableControl(iscontrol);
    iscontrol && setControled(false);

    const tmphollow = findUniqueValuesForProperty(array, 'hollow');
    const ishollow = !tmphollow.some(itm => itm === true);
    setdisableHollow(ishollow);
    ishollow && setHollow(false);

    const tmpencorder = findUniqueValuesForProperty(array, 'encorder');
    const isencorder = !tmpencorder.some(itm => itm === true);
    setdisableEncorder(isencorder);
    isencorder && setEncorder(false);

    const tmpgeared = findUniqueValuesForProperty(array, 'geared');
    const isgeared = !tmpgeared.some(itm => itm === true);
    setdisableGeared(isgeared);
    isgeared && setGeared(false);

    const tmpbrakable = findUniqueValuesForProperty(array, 'brakable');
    const isbrakable = !tmpbrakable.some(itm => itm === true);
    setdisableBrakable(isbrakable);
    isbrakable && setBrakable(false);

    if (voltage12) {
      var tmpspeeds = getSpeedsForVoltage(array, 12);
      const min = tmpspeeds.length === 0 ? 0 : Math.min(...tmpspeeds);
      const max = tmpspeeds.length === 0 ? 0 : Math.max(...tmpspeeds);
      setMinspeed(min);
      setMaxspeed(max);
      qrySpeeds.length == 2 && (qrySpeeds[1] < min || qrySpeeds[1] > max) && setQrySpeeds(['']);
    }
    else if (voltage24) {
      var tmpspeeds = getSpeedsForVoltage(array, 24);
      const min = tmpspeeds.length === 0 ? 0 : Math.min(...tmpspeeds);
      const max = tmpspeeds.length === 0 ? 0 : Math.max(...tmpspeeds);
      setMinspeed(min);
      setMaxspeed(max);
      qrySpeeds.length == 2 && (qrySpeeds[1] < min || qrySpeeds[1] > max) && setQrySpeeds(['']);
    }
    else if (voltage36) {
      var tmpspeeds = getSpeedsForVoltage(array, 36);
      const min = tmpspeeds.length === 0 ? 0 : Math.min(...tmpspeeds);
      const max = tmpspeeds.length === 0 ? 0 : Math.max(...tmpspeeds);
      setMinspeed(min);
      setMaxspeed(max);
      qrySpeeds.length == 2 && (qrySpeeds[1] < min || qrySpeeds[1] > max) && setQrySpeeds(['']);
    }
    else if (voltage48) {
      var tmpspeeds = getSpeedsForVoltage(array, 48);
      const min = tmpspeeds.length === 0 ? 0 : Math.min(...tmpspeeds);
      const max = tmpspeeds.length === 0 ? 0 : Math.max(...tmpspeeds);
      setMinspeed(min);
      setMaxspeed(max);
      qrySpeeds.length == 2 && (qrySpeeds[1] < min || qrySpeeds[1] > max) && setQrySpeeds(['']);
    }
    else {
      var tmpspeeds = findUniqueValuesForProperty(array, 'speed');
      const min = tmpspeeds.length === 0 ? 0 : Math.min(...tmpspeeds);
      const max = tmpspeeds.length === 0 ? 0 : Math.max(...tmpspeeds);
      setMinspeed(min);
      setMaxspeed(max);
      qrySpeeds.length == 2 && (qrySpeeds[1] < min || qrySpeeds[1] > max) && setQrySpeeds(['']);
    }
  };

  useEffect(() => {
    // public 폴더의 JSON 파일을 불러옵니다.
    const loadData = async () => {
      try {
        const response = await fetch('/model.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);

        const tmptorques = findUniqueValuesForProperty(json, 'torque');
        setTorques(tmptorques);
        setDisplaytorques(tmptorques);
        setSlidTorque(tmptorques[0]);
        var tmpspeeds = findUniqueValuesForProperty(json, 'speed');
        tmpspeeds = tmpspeeds.filter(v => v !== 0);
        console.log(tmpspeeds);
        setSpeeds(tmpspeeds);
        setDisplayspeeds(tmpspeeds);
        setSlidspeed(tmpspeeds[0]);
        const tmpsizes = findUniqueValuesForProperty(json, 'size');
        setSizes(tmpsizes);
        setDispData(json);
        setData(json);



        checkFilterdisable(json);
        // console.log(tmpcontroled, tmpcontroled.length);
      } catch (error) {
        console.error("Fetching JSON data failed", error);
      }
    };
    // console.log("================= load ====================");
    loadData();

    console.log("params :", params.type);

    const queryParams = new URLSearchParams(location.search);
    setControled(queryParams.get('controled') === '1');
    setBrakable(queryParams.get('brakable') === '1');
    setGeared(queryParams.get('geared') === '1');
    setHollow(queryParams.get('hollow') === '1');
    setEncorder(queryParams.get('encorder') === '1');
    setVoltage12(queryParams.get('voltage12') === '1');
    setVoltage24(queryParams.get('voltage24') === '1');
    setVoltage36(queryParams.get('voltage36') === '1');
    setVoltage48(queryParams.get('voltage48') === '1');
    setCommrs485(queryParams.get('commrs485') === '1');
    setCommethercat(queryParams.get('commethercat') === '1');

    var tsize = [''];
    var ttq = [''];
    var tspd = [''];
    queryParams.forEach((v, k) => {
      if (k.startsWith('sz')) {
        tsize.push(k.substring(2));
      }

      if (k.startsWith('spd')) {
        tspd.push(k.substring(3));
      }

      if (k.startsWith('tq')) {
        ttq.push(k.substring(2));
      }
    });
    // console.log(tspd);
    setQrySizes(tsize);
    setQrySpeeds(tspd);
    setQryTorques(ttq);
  },[]);

  useEffect(() => {
    if (data != null) {
      var tmp = data.filter(it => it['type-use'].indexOf(params.type) >= 0);
      tmp = tmp.filter( it => !controled || it.controled == controled);
      tmp = tmp.filter(it => !brakable || it.brakable == brakable);
      tmp = tmp.filter(it => !geared || it.geared == geared);
      tmp = tmp.filter(it => !hollow || it.hollow == hollow);
      tmp = tmp.filter(it => !encorder || it.encorder == encorder);
      // console.log(tmp[0].communication)
      tmp = tmp.filter(it => !voltage12 || it.specs.some(spec => spec.voltage === 12));
      tmp = tmp.filter(it => !voltage24 || it.specs.some(spec => spec.voltage === 24));
      tmp = tmp.filter(it => !voltage36 || it.specs.some(spec => spec.voltage === 36));
      tmp = tmp.filter(it => !voltage48 || it.specs.some(spec => spec.voltage === 48));

      tmp = tmp.filter(it => qrySizes.length == 1 || qrySizes.some(s => s === it.size));
      tmp = tmp.filter(it => !commrs485 || it.communication.indexOf('rs485') >= 0);
      tmp = tmp.filter(it => !commethercat || it.communication.indexOf('ethercat') >= 0);
      tmp = tmp.filter(it => qryTorques.length == 1 || qryTorques[1] <= it.torque);
      tmp = tmp.filter(it => qrySpeeds.length == 1 || it.specs.some(spec => spec.speed >= parseInt(qrySpeeds[1])));

      checkFilterdisable(tmp);
      setDispData(tmp)
      const newurl = [];
      controled && newurl.push("controled=1");
      brakable && newurl.push("brakable=1");
      geared && newurl.push("geared=1");
      hollow && newurl.push("hollow=1");
      encorder && newurl.push("encorder=1");
      voltage12 && newurl.push("voltage12=1");
      voltage24 && newurl.push("voltage24=1");
      voltage36 && newurl.push("voltage36=1");
      voltage48 && newurl.push("voltage48=1");
      commrs485 && newurl.push("commrs485=1");
      commethercat && newurl.push("commethercat=1");

      if (qrySizes.length > 1) {
        const t = qrySizes.filter(it => it !== '');
        t.forEach( (v) => {
          newurl.push(`sz${v}=1`);
        });
      }

      if (qrySpeeds.length > 1) {
        const t = qrySpeeds.filter(it => it !== '');
        t.forEach( (v) => {
          newurl.push(`spd${v}=1`);
        });
      }

      if (qryTorques.length > 1) {
        const t = qryTorques.filter(it => it !== '');
        t.forEach( (v) => {
          newurl.push(`tq${v}=1`);
        });
      }

      if (newurl.length > 0)
        window.history.pushState("", "재품선정", `/choose/${params.type}?${newurl.join('&')}`)
      else
        window.history.pushState("", "재품선정", `/choose/${params.type}`)
    }
  }, [data, controled, brakable, geared, hollow, voltage12, voltage24, voltage36, voltage48, encorder, commrs485, qrySizes, qrySpeeds, qryTorques, commethercat])

  const opennewwindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar 
        sx={{ alignItems: 'center' }} 
        color='nurirobot'>
          <Toolbar>
            <Typography variant="h5" onClick={() => navigator('/')}>
              누리로봇&nbsp;&nbsp;Nurirobot
            </Typography>
          </Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { sm: 'none' },
                position: 'absolute',
                zIndex: 999,
                top: 8,
                right: 5,
                margin: "0px 7px"
                
              }}
            >
              <MenuIcon />
            </IconButton>          
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/choose">
            <Typography variant="h6">
            구동기(모터) 형태 선택
            </Typography>
          </Link>
          <Typography variant="h6">
            세부정보입력
          </Typography>
        </Breadcrumbs>
        
        <Main open={!isMobile} >
        {/* <DrawerHeader /> */}
        <ImageList cols={isMd? 2: 3} >
          {/* <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">December</ListSubheader>
          </ImageListItem> */}
          {dispdata.map((item, index) => (
            <ImageListItem key={index}>
              <img
                onClick={() => {
                  handleClickOpen(
                    item['step-url'] ? item['step-url'] : '', 
                    item['dxf-url'] ? item['dxf-url'] : '',
                    item['nurirobot-url'] ? item['nurirobot-url']: '',
                    item.name ? item.name : '',
                    item['stl-url'] ? item['stl-url'] : '');
                }}
                srcSet={item.picture[0]}
                src={item.picture[0]}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{height: '60px'}}
                title={item.name}
                subtitle={item['nurirobot-url']}
                actionIcon={
                  item['nurirobot-url']?
                  <Tooltip title="구매링크">
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)', mr: '5px' }}
                      aria-label={`info about ${item.name}`}
                      onClick={() => opennewwindow(item['nurirobot-url'])}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </Tooltip>
                  : <></>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Main>
      <Drawer
        sx={{
          background: 'transparent',
          width: drawerWidth,
          zIndex:9999,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        anchor="right">
        <DrawerHeader>
          {isMobile ?
          <IconButton onClick={() => setMobileOpen(false)}>
            <ChevronRightIcon />
          </IconButton>
          : <></>}
        </DrawerHeader>
        <Divider />

        <Box sx={{ 
          width: '100%',
          overflow: 'hidden', // 기본적으로 스크롤바를 숨깁니다.
          '&:hover': {
            overflowY: 'auto' // 컴포넌트에 마우스를 올렸을 때 스크롤바를 보여줍니다.
          },
      }} >
          <Stack>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              제어기 포함
              {/* (with motor controller) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setControled(!controled) || (isMobile && setMobileOpen(false)) }
                checked={controled}
                disabled={disableControl}
                text="포함"/>
            </Item>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              토크(Nm)
              {/* (torque) */}
            </Typography>
            <Item>
              <Slider 
              marks={[
                {value: torques[0], label: `${torques[0]}`},
                {value: torques[torques.length - 1], label: `${torques[torques.length - 1]}`}
              ]}
              color='optionbtn'
              aria-label="Default" valueLabelDisplay="auto" 
              sx={{width: '160px'}}
              step={.1}
              value={slidTorque}
              min={torques[0]}
              max={torques[torques.length - 1]}
              onChange={(event, newValue) => {
                setSlidTorque(newValue);
                setDisplaytorques(torques.filter((v) => v >= newValue));
                setQryTorques(['']);
              }}
               />
            </Item>
            <Box sx={{ 
              maxHeight: 200, 
              overflow: 'hidden', // 기본적으로 스크롤바를 숨깁니다.
              '&:hover': {
                overflowY: 'auto' // 컴포넌트에 마우스를 올렸을 때 스크롤바를 보여줍니다.
              }, }}>
            {displaytorques.map((v, index) => (
              <Item key={index}>
              <CheckboxButton
                checked={qryTorques.some(itm => itm === `${v}`)}
                onChange={() => {
                  if (qryTorques.some(itm => itm === `${v}`))
                    setQryTorques(['']);
                  else 
                  setQryTorques( ['', `${v}`]);

                  isMobile && setMobileOpen(false);
                }}
                disabled={qryTorques.length > 1 && !qryTorques.some(itm => parseFloat(itm) <= v) }
                text={v}/>
              </Item>
            ))}
            </Box>            
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              속도(RPM)
              {/* (torque) */}
            </Typography>
            <Item>
              <Slider
              marks={[
                {value: speeds[0], label: `${speeds[0]}`},
                {value: speeds[speeds.length - 1], label: `${speeds[speeds.length - 1]}`}
              ]}               
              color='optionbtn'
              aria-label="Default" valueLabelDisplay="auto" 
              sx={{width: '160px'}}
              value={slidSpeed}
              min={speeds[0]}
              max={speeds[speeds.length - 1]}
              onChange={(event, newValue) => {
                setSlidspeed(newValue);
                setDisplayspeeds(speeds.filter((v) => v >= newValue));
                setQrySpeeds(['']);
              }}
               />
            </Item>
            <Box sx={{ maxHeight: 200, 
                      overflow: 'hidden', // 기본적으로 스크롤바를 숨깁니다.
                      '&:hover': {
                        overflowY: 'auto' // 컴포넌트에 마우스를 올렸을 때 스크롤바를 보여줍니다.
                      },}}>
            {displayspeeds.map((v, index) => (
              <Item key={index}>
              <CheckboxButton
                checked={qrySpeeds.some(itm => itm === `${v}`)}
                onChange={() => {
                  if (qrySpeeds.some(itm => itm === `${v}`))
                    setQrySpeeds(['']);
                  else 
                    setQrySpeeds( ['', `${v}`]);

                  isMobile && setMobileOpen(false);
                }}
                disabled={
                  maxSpeed < v ||
                  minSpeed > v ||
                  (qrySpeeds.length > 1 && 
                  !qrySpeeds.some(itm => parseInt(itm) <= v)) }              
                text={v}/>
              </Item>
            ))}
            </Box>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              크기
              {/* (torque) */}
            </Typography>
            <Box sx={{ maxHeight: 270, 
                      overflow: 'hidden', // 기본적으로 스크롤바를 숨깁니다.
                      '&:hover': {
                        overflowY: 'auto' // 컴포넌트에 마우스를 올렸을 때 스크롤바를 보여줍니다.
                      }, }}>
            {sizes.map((v, index) => (
              <Item key={index}>
              <CheckboxButton
                checked={qrySizes.some(itm => itm === v)}
                onChange={() => {
                  if (qrySizes.some(itm => itm === v))
                    setQrySizes(['']);
                  else 
                    setQrySizes(['',v]);

                  isMobile && setMobileOpen(false);
                }}
                disabled={qrySizes.length > 1 && !qrySizes.some(itm => itm === v)}
                text={v}/>
              </Item>
            ))}
            </Box>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              입력 전압
              {/* (input voltage) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setVoltage12(!voltage12) || (isMobile && setMobileOpen(false)) }
                checked={voltage12}
                disabled={voltage24 || voltage36 || voltage48}
                text="12 V"/>
            </Item>
            <Item>
              <CheckboxButton
                onChange={() => setVoltage24(!voltage24) || (isMobile && setMobileOpen(false)) }
                checked={voltage24}
                disabled={voltage12 || voltage36 || voltage48}
                text="24 V"/>
            </Item>
            <Item>
              <CheckboxButton
                onChange={() => setVoltage36(!voltage36) || (isMobile && setMobileOpen(false)) }
                checked={voltage36}
                disabled={voltage12 || voltage24 || voltage48}
                text="36 V"/>
            </Item>
            <Item>
              <CheckboxButton
                onChange={() => setVoltage48(!voltage48) || (isMobile && setMobileOpen(false)) }
                checked={voltage48}
                disabled={voltage12 || voltage24 || voltage36}
                text="48 V"/>
            </Item>                        
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              브레이크 여부
              {/* (with motor brake) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setBrakable(!brakable) || (isMobile && setMobileOpen(false)) }
                checked={brakable}
                disabled={disablebrakable}
                text="포함"/>
            </Item>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              기어 여부
              {/* (with reducer) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setGeared(!geared) || (isMobile && setMobileOpen(false)) }
                checked={geared}
                disabled={disablegeared}
                text="포함"/>
            </Item>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              엔코더 여부
              {/* (with encoder) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setEncorder(!encorder) || (isMobile && setMobileOpen(false)) }
                checked={encorder}
                disabled={disableencorder}
                text="포함"/>
            </Item>
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              중공 여부
              {/* (is hollow) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setHollow(!hollow) || (isMobile && setMobileOpen(false)) }
                checked={hollow}
                disabled={disablehollow}
                text="포함"/>
            </Item> 
            <Typography variant="body1" sx={{ml: 2, mt: 2}}>
              통신방식
              {/* (communication) */}
            </Typography>
            <Item>
              <CheckboxButton
                onChange={() => setCommrs485(!commrs485) || (isMobile && setMobileOpen(false)) }
                checked={commrs485}
                disabled={disableRs485}
                text="RS485"/>
            </Item>
            <Item>
              <CheckboxButton
                onChange={() => setCommethercat(!commethercat) || (isMobile && setMobileOpen(false)) }
                checked={commethercat}
                disabled={disableEthercat}
                text="EtherCAT"/>
            </Item>            
          </Stack>
        </Box>
      </Drawer>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth={maxWidth}
        fullWidth={true}
        sx={{
          '& .MuiPaper-root': { // Dialog의 Paper 컴포넌트를 대상으로 합니다.
            height: '80vh', // 최대 높이를 화면의 80%로 설정합니다.
            background: '#313639'
          }
        }}
      >
        <DialogTitle sx={{color: '#fff'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              미리보기
            </Typography>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {dialogName}
            </Typography>
            {dialogbuyurl ? 
            <Tooltip title="구매링크">
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)', mr: '5px' }}
                aria-label={`info about ${dialogName}`}
                onClick={() => opennewwindow(`${dialogbuyurl}`)}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
            :<></>
            }
          </Toolbar>
        </DialogTitle>
        <DialogContent>
          {!isMd ?
          <SplitPane 
          allowResize={allowResize}
          split="vertical" 
          primary='first'>
              <Box sx={{height: '100%', mr: '10px'}} minSize='200'>
                {/* <Box fullWidth height={'100%'} sx={{background: red[100]}}/> */}
                {stepUrl ?
                <ViewerWithUI url={stepUrl} stlurl={stlUrl} fullWidth height={'100%'} loaded={onLoaded} />
                :<Typography variant="h6" component="div" sx={{color: '#fff'}}>
                등록된 파일 없음
              </Typography>
                }
              </Box>
              <Box sx={{height: '100%', ml: '10px'}} minSize='200' >
                {dxfUrl ? 
                <ViewerDxf url={dxfUrl} />
                : <Typography variant="h6" component="div" sx={{color: '#fff'}}>
                등록된 파일 없음
              </Typography>
                }
              </Box>
          </SplitPane>
          : 
          <Box sx={{overflow: 'auto'}}>
            <Box fullWidth height={400}>
              {stepUrl ?
                  <MobileViewerWithUI url={stepUrl} stlurl={stlUrl} loaded={onLoaded} />
                  :<Typography variant="h6" component="div" sx={{color: '#fff'}}>
                  등록된 파일 없음
                </Typography>
                  }
            </Box>
            <Box fullWidth height={400}>
              {dxfUrl ? 
                  <MobileViewerDxf url={dxfUrl} fullWidth height={500}/>
                  : <Typography variant="h6" component="div" sx={{color: '#fff'}}>
                  등록된 파일 없음
                </Typography>
                  }
            </Box>              
          </Box>
              }
        </DialogContent>
      </Dialog>
      </Container>
    </>
  );
}

export default Choose;