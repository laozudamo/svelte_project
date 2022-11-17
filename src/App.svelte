<script>
import Button,{Label} from '@smui/button';
</script>

<Button on:click={() => alert('See, I told you.')}>This is a button!</Button>
<Button type="primary" variant="raised">
  <Label>Raised</Label>
</Button>