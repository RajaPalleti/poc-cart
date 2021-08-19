import React from 'react';
import { Slider, Handles } from 'react-compound-slider'
const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 80,
    border: '1px solid steelblue',
  }
  
  const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
  }
export default function Handle({
    handleData,
    getHandleProps
}) {
    return (
        <div
            style={{
                left: 0,
                position: 'absolute',
                marginLeft: -15,
                marginTop: 25,
                zIndex: 2,
                width: 30,
                height: 30,
                border: 0,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: '#2C4870',
                color: '#333',
            }}
            {...getHandleProps()}
        >
            <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
                {/* {handleData.value} */}
            </div>
            <Slider
                rootStyle={sliderStyle}
                domain={[0, 100]}
                step={1}
                mode={2}
                values={[30]}
            >
                <div style={railStyle} />
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map(handle => (
                                <Handle
                                    key={handleData.id}
                                    handle={handleData}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
            </Slider>
        </div>
    )
}
