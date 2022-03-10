import { Image, Modal, Text } from '@nextui-org/react';
import React, { useState } from 'react';

import { regex } from '@/utils/regex';

export const ImageTick: React.FC<any> = (props: any) => {
  const { x, y, payload } = props;
  const [open, setOpen] = useState<boolean>(false);

  if (typeof payload.value !== 'string') return <></>;

  return (
    <>
      <Modal closeButton open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <Text>{payload.value.match(regex.NFT_ID)}</Text>
        </Modal.Header>
        <Modal.Body css={{ marginBottom: '$6' }}>
          <Image src={payload.value} width="full" height="full" />
        </Modal.Body>
      </Modal>
      <g
        transform={`translate(${x - payload.offset / 4},${y})`}
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        <image width={30} height={30} href={payload.value} />
        {/* <text x={0} y={15} dy={16} textAnchor="end" fill="#666" transform="">
          {payload.value.match(regex.NFT_ID)}
        </text> */}
      </g>
    </>
  );
};
