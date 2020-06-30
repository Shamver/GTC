import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const ReportList = ( reportData ) => {
  const{ reportId } = reportData;
  console.log(reportId)
  return (
    <tr>
      <td></td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>7</td>
    </tr>
  );
};

export default memo(ReportList);
