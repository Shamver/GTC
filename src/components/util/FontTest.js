import React, { memo } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const FontTest = () => {
  const list = [
    { size: 14, weight: 100 },
    { size: 14, weight: 200 },
    { size: 14, weight: 300 },
    { size: 14, weight: 400 },
    { size: 14, weight: 500 },
    { size: 14, weight: 600 },
    { size: 14, weight: 700 },
    { size: 14, weight: 800 },
    { size: 14, weight: 900 },
    { size: 15, weight: 100 },
    { size: 15, weight: 200 },
    { size: 15, weight: 300 },
    { size: 15, weight: 400 },
    { size: 15, weight: 500 },
    { size: 15, weight: 600 },
    { size: 15, weight: 700 },
    { size: 15, weight: 800 },
    { size: 15, weight: 900 },
    { size: 16, weight: 100 },
    { size: 16, weight: 200 },
    { size: 16, weight: 300 },
    { size: 16, weight: 400 },
    { size: 16, weight: 500 },
    { size: 16, weight: 600 },
    { size: 16, weight: 700 },
    { size: 16, weight: 800 },
    { size: 16, weight: 900 },
  ];

  return (
    <Wrapper>
      <span>&apos;RIDIBatang&apos;</span>
      <Row>
        {list.map(({ size, weight }) => (
          <Text size={size} weight={weight} className="col-sm-4">
            <div>
              [{size}px, {weight}w] GTC hi 안녕. 반갑다!
            </div>
          </Text>
        ))}
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & .row {
    border: 1px solid red;
    padding: 4px;
  }
`;

const Text = styled(Col)`
  padding: 0 4px !important;
  margin: 4px 0;
  font-size: ${(props) => props.size}px;
  font-weight: ${(props) => props.weight};
  
  & div {
    text-align: center;
    padding: 2px !important;
    border: 1px solid green; 
  }
`;

export default memo(FontTest);
