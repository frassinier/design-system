import Datalist from './Field/Datalist';
import Fieldset from './Fieldset';
import Form from './Form';
import Input from './Field/Input';
import InputGroup from './Field/InputGroup';
import InputGroupPrefix from './Field/InputGroup/InputGroupPrefix';
import InputGroupSuffix from './Field/InputGroup/InputGroupSuffix';
import Label from './Label';
import Select from './Field/Select';
import Textarea from './Field/Textarea';

Form.Checkbox = Input.Checkbox;
Form.Datalist = Datalist;
Form.Date = Input.Date;
Form.DatetimeLocal = Input.DatetimeLocal;
Form.Email = Input.Email;
Form.Fieldset = Fieldset;
Form.File = Input.File;
Form.Hidden = Input.Hidden;
Form.InputGroup = InputGroup;
Form.InputGroupPrefix = InputGroupPrefix;
Form.InputGroupSuffix = InputGroupSuffix;
Form.Label = Label;
Form.Month = Input.Month;
Form.Number = Input.Number;
Form.Password = Input.Password;
Form.Radio = Input.Radio;
Form.Range = Input.Range;
Form.Search = Input.Search;
Form.Select = Select;
Form.Switch = Input.Switch;
Form.Tel = Input.Tel;
Form.Text = Input.Text;
Form.Textarea = Textarea;
Form.Time = Input.Time;
Form.Url = Input.Url;
Form.Week = Input.Week;

export default Form;
