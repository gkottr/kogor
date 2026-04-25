import { useState, useCallback } from 'react'
import { Button, Flex, Input, notification, Form, Typography } from 'antd'

function App() {
  const [value, setValue] = useState('');
  const [babyficated, setBabyficated] = useState('');

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleBabificate = useCallback(() => {
    const penis = value.replace('svdba.ru', 'бейби-и-анастасия.рф');

    setBabyficated(penis);
    navigator.clipboard.writeText(penis);

    notification.success({ title: 'Скопировано' });
  }, [value]);

  return (
    <div className="container">
      <Typography.Paragraph className="useNewLine">{pureBear}</Typography.Paragraph>

      <Typography.Text>Ссылка на приглашение</Typography.Text>
      <Flex gap="8px">
        <Input value={value} onChange={handleChange} onPressEnter={handleBabificate}/>
        <Button type="primary" onClick={handleBabificate}>Бейбифицировать</Button>
      </Flex>

      <div className="gap"/>
      {babyficated && <Input disabled={true} onClick={handleBabificate} value={babyficated}/>}
    </div>
  )
}

const bear =
    ". . . . . . . . . . .,'´`. ,'``;\n" +
    ". . . . . . . . . .,`. . .`—–'..\n" +
    '. . . . . . . . . .,. . . . . .~ .`- .\n' +
    ". . . . . . . . . ,'. . . . . . . .o. .o__\n" +
    '. . . . . . . . _l. . . . . . . . . . . .\n' +
    ". . . . . . . _. '`~-.. . . . . . . . . .,'\n" +
    ". . . . . . .,. .,.-~-.' -.,. . . ..'–~`\n" +
    '. . . . . . /. ./. . . . .}. .` -..,/\n' +
    ". . . . . /. ,'___. . :/. . . . . .\n" +
    ". . . . /'`-.l. . . `'-..'........ . .\n" +
    '. . . ;. . . . . . . . . . . . .)-.....l\n' +
    ". . .l. . . . .' —........-'. . . ,'\n" +
    ". . .',. . ,....... . . . . . . . . .,'\n" +
    ". . . .' ,/. . . . `,. . . . . . . ,'_______\n" +
    ". . . . .. . . . . .. . . .,.- '_________|_')\n" +
    ". . . . . ',. . . . . ',-~'`. (.))\n" +
    '. . . . . .l. . . . . ;. . . /__\n' +
    '. . . . . /. . . . . /__. . . . .)\n' +
    ". . . . . '-.. . . . . . .)\n" +
    ". . . . . . .' - .......-`";

const pureBear = bear.replaceAll('.', '  ');

export default App
